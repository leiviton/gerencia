import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardService } from "./services/dashboard.service";

import { BreadcrumbsComponent } from './../shared/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
  ],
  declarations: [ DashboardComponent,
      BreadcrumbsComponent ],
    providers: [DashboardService]
})
export class DashboardModule { }
