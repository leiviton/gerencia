import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersCancelComponent } from './components/orders.component';

import { PrinterComponent} from "./components/printer.component";

import { EditComponent} from "./components/edit.component";


const routes: Routes = [
  {
    path: '',
    component: OrdersCancelComponent,
    data: {
      title: 'Pedidos Cancelados'
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
          }

      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersCancelRoutingModule {}
