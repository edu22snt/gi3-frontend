import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      throw error;
    })
  );
};
