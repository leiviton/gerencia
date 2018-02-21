import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'

import { OpenCloseCaixasComponent } from './components/open-close-caixas.component';

import { OpenCloseCaixasRoutingModule } from './open-close-caixas-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { OpenCloseCaixasService } from './services/open-close-caixas.service';
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { OpenCloseComponent } from "./components/open-close.component"


@NgModule({
  imports: [
    CommonModule,
    OpenCloseCaixasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TooltipModule,
    FormsModule,
      CuppaDataGridModule,
      TabsModule,
      CurrencyMaskModule,
      NgxPhoneMaskModule,
  ],
  declarations: [ OpenCloseCaixasComponent, OpenCloseComponent ],
  providers: [ OpenCloseCaixasService, BsModalService ]
})
export class OpenCloseCaixasModule { }
