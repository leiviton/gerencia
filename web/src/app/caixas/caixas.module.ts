import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'

import { CaixasComponent } from './components/caixas.component';
import { PaymentComponent } from "./components/payment.component";

import { CaixasRoutingModule } from './caixas-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { CaixasService } from './services/caixas.service';
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import {PrinterComponent} from "./components/printer.component";
import { EditComponent} from "./components/edit.component";
import { SaqueComponent} from "./components/saque.component";
import { TransferenciaComponent } from "./components/transferencia.component";


@NgModule({
  imports: [
    CommonModule,
    CaixasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      CuppaDataGridModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule,
  ],
  declarations: [ CaixasComponent,PaymentComponent,PrinterComponent,EditComponent,SaqueComponent, TransferenciaComponent ],
  providers: [ CaixasService, BsModalService ]
})
export class CaixasModule { }
