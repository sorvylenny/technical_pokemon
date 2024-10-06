import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { HomePaths } from '../utils/paths';
import { User } from '../interfaces/login/login';


export const adminGuard: CanActivateFn = async (route, state) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);

  const existToken = await _authService.hasStorage('token');
  if (!existToken) {
    const user = await _authService.getStorage('user') as User
    if (user && user.role !== 'admin') {
      _router.navigate([HomePaths.ROOT]);
    }
  }
  return true;
};
