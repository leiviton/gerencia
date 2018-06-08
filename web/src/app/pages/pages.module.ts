import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import {AuthService} from "../user/services/auth.service";

@NgModule({
  imports: [ PagesRoutingModule,
      CommonModule,
      FormsModule ],
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent
  ],
  providers:[ AuthService]
})
export class PagesModule { }
