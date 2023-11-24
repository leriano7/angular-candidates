import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);
  // Coherción a booleano.
  // Esto quiere decir que si es distinto de nulo, será verdadero.
  // Si es nulo, será falso.

  if(userService.isLogged()) return true;
  return router.parseUrl('/login');
};
