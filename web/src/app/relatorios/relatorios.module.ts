import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule} from '@angular/forms'
import { MovimentoCaixasRoutingModule } from './relatorios-routing.module';
import { TooltipModule } from 'ngx-bootstrap';
import { RelatoriosService } from './services/relatorios.service';
import { CuppaDataGridModule } from 'cuppa-ng2-grid/cuppa-ng2-dataGrid';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { RelatorioMovCaixaComponent} from "./components/relatorio-mov-caixa.component";
import { RelatorioPedidosPeriodoComponent} from "./components/relatorio-pedidos-periodo.component";


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
  declarations: [ RelatorioMovCaixaComponent, RelatorioPedidosPeriodoComponent ],
  providers: [ RelatoriosService, BsModalService ]
})
export class RelatoriosModule { }
