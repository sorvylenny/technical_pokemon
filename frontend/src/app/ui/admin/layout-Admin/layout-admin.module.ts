import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { NgxNotifierComponent } from 'ngx-notifier';
import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin.component';
import { ChartComponent } from '../chart/chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutAdminComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    LayoutAdminRoutingModule,
    ReactiveFormsModule,
    RouterLinkActive,
    FormsModule,
    NgxNotifierComponent,
  ]
})
export class LayoutAdminModule { }
