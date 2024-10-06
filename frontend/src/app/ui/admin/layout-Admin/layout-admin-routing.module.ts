import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { LayoutAdminComponent } from './layout-admin.component';
import { HomePaths } from '@/app/core/utils/paths';


const routes: Routes = [{
  path: HomePaths.ROOT,
  component: LayoutAdminComponent,
  children: [
    {
      path: HomePaths.DASHBOARD,
      component: DashboardComponent
    },
    {
      path: "**", redirectTo: "", pathMatch: "full"
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule { }
