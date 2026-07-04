import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Functional HTTP interceptor that runs before every outgoing request.
// It reads the stored JWT from AuthService and adds it to the Authorization header
// so protected API endpoints (e.g. [Authorize] or [Authorize(Roles = "Admin")]) accept the request.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  // Only attach the header when a token exists.
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // No token — forward the original request unchanged (e.g. login/register).
  return next(req);
};
