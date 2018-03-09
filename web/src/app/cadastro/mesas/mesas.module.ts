import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MesasComponent } from './components/mesas.component';
import { NewComponent } from './components/new.component';
import { EditComponent} from "./components/edit.component";
import { MesasRoutingModule } from './mesas-routing.module';


import { MesasService } from './services/mesas.service';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxPhoneMaskModule } from 'ngx-phone-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MesasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CurrencyMaskModule,
    NgxPhoneMaskModule
  ],
  declarations: [ MesasComponent, NewComponent, EditComponent ],
  providers: [ MesasService]
})
export class MesasModule { }

