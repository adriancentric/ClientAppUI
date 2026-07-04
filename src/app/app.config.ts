import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './interceptors/auth.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withInterceptors registers the auth interceptor so every outgoing HTTP request
    // automatically gets the Authorization: Bearer {token} header when the user is logged in.
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};
