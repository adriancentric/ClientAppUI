import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional route guard that protects routes requiring authentication.
// If the user is logged in, the navigation is allowed.
// Otherwise they are redirected to /login.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login and preserve the original URL so we could resume after login.
  return router.createUrlTree(['/login']);
};
