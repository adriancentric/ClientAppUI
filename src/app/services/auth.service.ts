import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResponse } from '../models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for the .NET AuthController endpoints.
  private readonly apiUrl = 'https://localhost:7080/api/Auth';

  // Key used to persist the JWT access token in localStorage.
  private readonly tokenKey = 'access_token';

  // Internal writable signal holding the current username (null when logged out).
  private readonly _username = signal<string | null>(this.parseUsernameFromToken());

  // Read-only view of the username exposed to the rest of the app.
  public readonly username = this._username.asReadonly();

  // Derived signal: true when a username is stored (user is logged in).
  public readonly isLoggedIn = computed(() => this._username() !== null);

  constructor(private readonly http: HttpClient) {}

  // POST /login — send credentials, store the returned token on success.
  // withCredentials: true is required so the browser accepts the refreshToken cookie
  // that the API sets in the response (Set-Cookie header).
  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true }).pipe(
      tap(response => this.storeToken(response.accessToken))
    );
  }

  // POST /register — create an account and immediately log in with the returned token.
  // withCredentials: true is needed here for the same reason as login.
  register(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { username, password }, { withCredentials: true }).pipe(
      tap(response => this.storeToken(response.accessToken))
    );
  }

  // POST /logout — tell the API to invalidate the refresh token cookie.
  // The Authorization header is added automatically by the auth interceptor.
  logout() {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.clearToken())
    );
  }

  // Returns the stored JWT or null if the user is not logged in.
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Store the token and update the username signal.
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this._username.set(this.parseUsernameFromToken());
  }

  // Remove the token and clear the username signal.
  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this._username.set(null);
  }

  // Decode the JWT payload (middle segment) and read the username claim.
  // ASP.NET Core writes ClaimTypes.Name as "unique_name" in older JWT libraries
  // and as the full URI in newer ones — so we check the most common keys.
  private parseUsernameFromToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return (
        payload['unique_name'] ??
        payload['name'] ??
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ??
        null
      );
    } catch {
      return null;
    }
  }

  public isUserRole(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const tokenRole: string | null =
        payload['role'] ??
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
        null;

      return tokenRole === 'user';
    } catch {
      return false;
    }
  }
}
