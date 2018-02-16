import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MovimentoCaixasComponent } from './components/movimento-caixas.component';

import { PaymentComponent } from "./components/payment.component";

import { PrinterComponent} from "./components/printer.component";

import { EditComponent} from "./components/edit.component";


const routes: Routes = [
  {
    path: '',
    component: MovimentoCaixasComponent,
    data: {
      title: 'Movimento de Caixa'
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
              path: 'printer/:url/:arquivo',
              component: PrinterComponent,
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
export class MovimentoCaixasRoutingModule {}
