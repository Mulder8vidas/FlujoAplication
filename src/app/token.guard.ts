import { CanActivateFn } from '@angular/router';

export const tokenGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('eyJ-Aa5.sq4x38fw191&_xy7x:70x');
  if (!token) {
    //redirect to login using router
    return false;

  }
  return true;
};
