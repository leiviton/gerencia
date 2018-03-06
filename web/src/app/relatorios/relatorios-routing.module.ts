import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';


import { RelatorioMovCaixaComponent } from "./components/relatorio-mov-caixa.component";

import { RelatorioPedidosPeriodoComponent } from "./components/relatorio-pedidos-periodo.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Movimento de Caixa'
    },
      children: [
          {
              path: 'relatorio-movimento-caixa',
              component: RelatorioMovCaixaComponent,
              data: {
                  title: 'Relatorio Movimento de caixa'
              }
          },
          {
              path: 'relatorio-pedidos-periodo',
              component: RelatorioPedidosPeriodoComponent,
              data: {
                  title: 'Relatorio Pedidos'
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentoCaixasRoutingModule {}
