import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UsersComponent } from './components/users.component';
import { NewComponent } from './components/new.component';
import { EditComponent} from "./components/edit.component";
import { UsersRoutingModule } from './users-routing.module';

import { UsersService } from './services/users.service';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxPhoneMaskModule } from 'ngx-phone-mask';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    UsersRoutingModule,
    ChartsModule,
    BsDropdownModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule
  ],
  declarations: [ UsersComponent, NewComponent, EditComponent ],
  providers: [ UsersService ]
})
export class UsersModule { }

