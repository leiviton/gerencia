import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersComponent } from './components/orders.component';
import { EditComponent} from './components/edit.component';

import { NewComponent } from "./components/new.component";

import { PaymentComponent } from "./components/payment.component";

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: {
      title: 'Pedidos'
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
              path: 'new',
              component: NewComponent,
              data:{
                  title:'Novo'
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
export class OrdersRoutingModule {}
