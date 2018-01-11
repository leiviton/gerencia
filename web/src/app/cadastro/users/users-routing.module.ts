import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { UsersComponent } from './components/users.component';
import { NewComponent } from "./components/new.component"
import { EditComponent } from "./components/edit.component";
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Usuários'
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
export class UsersRoutingModule {}
