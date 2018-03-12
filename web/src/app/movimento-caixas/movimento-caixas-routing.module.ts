import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MovimentoCaixasComponent } from './components/movimento-caixas.component';

import { PrinterComponent} from "./components/printer.component";

import { EditComponent} from "./components/edit.component";

import { NewComponent} from "./components/new.component";


const routes: Routes = [
  {
    path: '',
    component: MovimentoCaixasComponent,
    data: {
      title: 'Movimento de Caixa'
    },
      children: [
          {
              path: 'new',
              component: NewComponent,
              data: {
                  title: 'Novo'
              }
          },
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
export class MovimentoCaixasRoutingModule {}
