import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './components/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PasswordComponent} from "./components/password.component";
import { DashboardService } from "./services/dashboard.service";
import {AuthService} from "../user/services/auth.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
  ],
  declarations: [ DashboardComponent,PasswordComponent ],
    providers: [DashboardService, AuthService]
})
export class DashboardModule { }
