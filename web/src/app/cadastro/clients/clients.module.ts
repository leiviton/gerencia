import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ClientsComponent } from './components/clients.component';
import { NewComponent } from './components/new.component';
import { EditComponent} from "./components/edit.component";
import { ClientsRoutingModule } from './clients-routing.module';


import { ClientsService } from './services/clients.service';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxPhoneMaskModule } from 'ngx-phone-mask';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    ClientsRoutingModule,
    ChartsModule,
    BsDropdownModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule
  ],
  declarations: [ ClientsComponent, NewComponent, EditComponent ],
  providers: [ ClientsService ]
})
export class ClientsModule { }

