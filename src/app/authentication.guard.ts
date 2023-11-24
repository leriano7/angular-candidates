import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  if(userService.isLogged()) return true;
  return router.parseUrl('/login');
};
