import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';


import { RelatorioMovCaixaComponent } from "./components/relatorio-mov-caixa.component";


const routes: Routes = [
  {
    path: '',
    component: RelatorioMovCaixaComponent,
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
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentoCaixasRoutingModule {}
