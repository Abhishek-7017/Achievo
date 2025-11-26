// src/app/interceptors/auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // if token exists and not expired, attach it
  if (token && !auth.isTokenExpired()) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // if token exists but expired, logout (optional)
  if (token && auth.isTokenExpired()) {
    auth.logout();
  }

  return next(req);
};
