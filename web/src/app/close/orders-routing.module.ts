import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersCloseComponent } from './components/orders.component';

import { PaymentComponent } from "./components/payment.component";

import { PrinterComponent} from "./components/printer.component";

import { EditComponent} from "./components/edit.component";


const routes: Routes = [
  {
    path: '',
    component: OrdersCloseComponent,
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
              path: 'printer/:id/:i',
              component: PrinterComponent,
              data: {
                  title: 'Printer'
              }
          },
          {
              path: 'payment/:id',
              component: PaymentComponent,
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
export class OrdersCloseRoutingModule {}
