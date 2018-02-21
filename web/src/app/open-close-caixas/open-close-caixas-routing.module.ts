import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OpenCloseCaixasComponent } from './components/open-close-caixas.component';
import { OpenCloseComponent } from "./components/open-close.component"



const routes: Routes = [
  {
    path: '',
    component: OpenCloseCaixasComponent,
    data: {
      title: 'Abertura e fechamento de Caixa'
    },
      children: [
          {
              path: 'abrir',
              component: OpenCloseComponent,
              data: {
                  title: 'Abir/Fechar'
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenCloseCaixasRoutingModule {}
