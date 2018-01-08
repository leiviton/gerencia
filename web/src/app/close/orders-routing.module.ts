import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersCloseComponent } from './components/orders.component';

import { PaymentComponent } from "./components/payment.component";

import { PrinterComponent} from "./components/printer.component";


const routes: Routes = [
  {
    path: '',
    component: OrdersCloseComponent,
    data: {
      title: 'Pedidos Fechados'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersCloseRoutingModule {}
