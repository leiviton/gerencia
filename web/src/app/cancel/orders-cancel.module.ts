import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'
import { OrdersCancelComponent } from './components/orders.component';
import { OrdersCancelRoutingModule } from './orders-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { OrdersService } from './services/orders.service';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import {PrinterComponent} from "./components/printer.component";
import { EditComponent} from "./components/edit.component";
import {ToastOptions} from "ng2-toasty";
import {AppMessageService} from "../app-message.service";


@NgModule({
  imports: [
    CommonModule,
    OrdersCancelRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule,
  ],
  declarations: [ OrdersCancelComponent,PrinterComponent,EditComponent ],
  providers: [ OrdersService, BsModalService,AppMessageService ]
})
export class OrdersCancelModule { }
