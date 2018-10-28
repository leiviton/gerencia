import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';


import { ReportsComponent } from "./components/reports.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Movimento de Caixa'
    },
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
