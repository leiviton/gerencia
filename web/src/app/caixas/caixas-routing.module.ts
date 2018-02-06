import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CaixasComponent } from './components/caixas.component';

import { PaymentComponent } from "./components/payment.component";

import { PrinterComponent} from "./components/printer.component";

import { EditComponent} from "./components/edit.component";


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
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaixasRoutingModule {}
