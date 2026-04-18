import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const jwt = localStorage.getItem('jwt');

  if (!jwt) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
