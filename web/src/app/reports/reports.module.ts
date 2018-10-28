import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'
import { ReportsRoutingModule } from './reports-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { ReportsService } from './services/reports.service';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { ReportsComponent } from "./components/reports.component";

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule,
  ],
  declarations: [ ReportsComponent ],
  providers: [ ReportsService, BsModalService ]
})
export class ReportsModule { }
