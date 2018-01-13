import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { PasswordComponent } from "./components/password.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
      children: [
          {
              path: 'password',
              component: PasswordComponent,
              data: {
                  title: 'Nova senha'
              }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
