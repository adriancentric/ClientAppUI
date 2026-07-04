import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Expose authService to the template so the navbar can read username and isLoggedIn.
  protected readonly authService;

  constructor(authService: AuthService, private readonly router: Router) {
    this.authService = authService;
  }

  // Called when the user clicks the Logout button in the navbar.
  protected logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      // Even if the API call fails, clear the local token and redirect.
      error: () => this.router.navigate(['/login'])
    });
  }
}
