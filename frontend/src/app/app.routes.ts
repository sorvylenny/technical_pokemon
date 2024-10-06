import { Routes } from '@angular/router';
import { HomeComponent } from './ui/modules/home/home.component';
import { HomePaths } from './core/utils/paths';
import { authGuard } from './core/guard/auth.guard';
import { adminGuard } from './core/guard/admin.guard';

export const routes: Routes = [
  { path: HomePaths.ROOT, component: HomeComponent },
  {
    path: HomePaths.LOGIN,
    loadComponent: () =>
      import('./ui/modules/shared/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: HomePaths.CHECKOUT,
    loadComponent: () =>
      import('./ui/modules/shared/checkout/checkout.component').then((m) => m.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: HomePaths.ADMIN,
    loadChildren: () => import('../app/ui/admin/layout-Admin/layout-admin.module').then(m => m.LayoutAdminModule),
    canActivate: [authGuard, adminGuard],
  },

  { path: HomePaths.BAD_URL, redirectTo: HomePaths.ROOT, pathMatch: 'full' }
];

