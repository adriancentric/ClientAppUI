// Shape of the response returned by the API for login and register.
// accessToken is a short-lived JWT used to authorise subsequent requests.
export interface AuthResponse {
  accessToken: string;
}
