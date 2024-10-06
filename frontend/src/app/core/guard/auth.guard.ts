import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HomePaths } from '../utils/paths';


export const authGuard: CanActivateFn = async (route, state) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);

  const existToken = await _authService.hasStorage('token');

  if (!existToken) {
    _router.navigate([HomePaths.LOGIN]);
    return false
  }
  return true;
};
