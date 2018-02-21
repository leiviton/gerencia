import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'

import { MovimentoCaixasComponent } from './components/movimento-caixas.component';
import { PaymentComponent } from "./components/payment.component";

import { MovimentoCaixasRoutingModule } from './movimento-caixas-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { MovimentoCaixasService } from './services/movimento-caixas.service';
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import {PrinterComponent} from "./components/printer.component";
import { EditComponent} from "./components/edit.component";

import { NewComponent} from "./components/new.component";


@NgModule({
  imports: [
    CommonModule,
    MovimentoCaixasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      CuppaDataGridModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule,
  ],
  declarations: [ MovimentoCaixasComponent,PaymentComponent,PrinterComponent,EditComponent,NewComponent ],
  providers: [ MovimentoCaixasService, BsModalService ]
})
export class MovimentoCaixasModule { }
