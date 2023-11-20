import { CanActivateFn } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // It must return boolean, Promise<boolean> or Observable<boolean>



  return true;
};
