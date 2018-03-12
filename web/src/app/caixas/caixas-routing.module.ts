import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CaixasComponent } from './components/caixas.component';

import { SaqueComponent } from "./components/saque.component";

import { EditComponent} from "./components/edit.component";

import { TransferenciaComponent } from "./components/transferencia.component"


const routes: Routes = [
  {
    path: '',
    component: CaixasComponent,
    data: {
      title: 'Pedidos Fechados'
    },
      children: [
          {
              path: 'edit/:id',
              component: EditComponent,
              data: {
                  title: 'Editar'
              }
          },
          {
              path: 'saque',
              component: SaqueComponent,
              data: {
                  title: 'Saque'
              }
          },
          {
              path: 'transferencia',
              component: TransferenciaComponent,
              data: {
                  title: 'Transferencia'
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaixasRoutingModule {}
