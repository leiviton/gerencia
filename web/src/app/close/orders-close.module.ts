import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'

import { OrdersCloseComponent } from './components/orders.component';
import { PaymentComponent } from "./components/payment.component";

import { OrdersCloseRoutingModule } from './orders-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { OrdersService } from './services/orders.service';
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import {PrinterComponent} from "./components/printer.component";
import { EditComponent} from "./components/edit.component";
import {ToastOptions} from "ng2-toasty";


@NgModule({
  imports: [
    CommonModule,
    OrdersCloseRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      CuppaDataGridModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule
  ],
  declarations: [ OrdersCloseComponent,PaymentComponent,PrinterComponent,EditComponent ],
  providers: [ OrdersService, BsModalService,ToastOptions ]
})
export class OrdersCloseModule { }
