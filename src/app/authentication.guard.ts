import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  // Coherción a booleano.
  // Esto quiere decir que si es distinto de nulo, será verdadero.
  // Si es nulo, será falso.
  if (!!localStorage.getItem('token')) {
    return true;
  }

  // ¿Diferencia entre parseUrl y navigate?

  return router.parseUrl('/login');
};
