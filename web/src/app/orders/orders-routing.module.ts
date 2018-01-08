import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersComponent } from './components/orders.component';
import { EditComponent} from './components/edit.component';

import { NewComponent } from "./components/new.component";

import { PaymentComponent } from "./components/payment.component";

import { PrinterComponent} from "./components/printer.component";

import { ComplementComponent } from "./components/complement.component";

import { OrdersCloseComponent } from "./components/orders-close.component"

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
              path: 'printer/:id/:i',
              component: PrinterComponent,
              data: {
                  title: 'Printer'
              }
          },
          {
              path: 'new',
              component: NewComponent,
              data:{
                  title:'Novo'
              },
              children:[
                  {
                      path: 'component/:id',
                      component: ComplementComponent,
                      data:{
                          title:'Component'
                      }
                  }
              ]
          },
          {
              path: 'payment/:id',
              component: PaymentComponent,
              data: {
                  title: 'Editar'
              }
          }
      ]
  },
  {
     path:"orders/close",
     component: OrdersCloseComponent,
     data: {
         title: 'Pedidos fechados'
     }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
