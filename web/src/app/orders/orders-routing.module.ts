import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrdersComponent } from './components/orders.component';
import { EditComponent} from './components/edit.component';

import { NewComponent } from "./components/new.component";

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
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
