import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
        {
            path: 'dashboard',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },
        {
            path: 'orders',
            loadChildren: './orders/orders.module#OrdersModule',
        },
        {
            path: 'close',
            loadChildren: './close/orders-close.module#OrdersCloseModule',
        },
        {
            path: 'orders/cancel',
            loadChildren: './cancel/orders-cancel.module#OrdersCancelModule',
        },
        {
            path: 'cadastro/produtos',
            loadChildren: './cadastro/produtos/produtos.module#ProdutosModule',
        },
        {
            path: 'cadastro/clients',
            loadChildren: './cadastro/clients/clients.module#ClientsModule',
        },
        {
            path: 'cadastro/users',
            loadChildren: './cadastro/users/users.module#UsersModule',
        },
        {
            path: 'cadastro/mesas',
            loadChildren: './cadastro/mesas/mesas.module#MesasModule',
        },
        {
            path: 'user',
            loadChildren: './user/user.module#UserModule',
        },
        {
            path: 'financeiro/caixas',
            loadChildren: './caixas/caixas.module#CaixasModule',
        },
        {
            path: 'financeiro/movimento/caixas',
            loadChildren: './movimento-caixas/movimento-caixas.module#MovimentoCaixasModule'
        },
        {
            path: 'financeiro/open/close/caixas',
            loadChildren: './open-close-caixas/open-close-caixas.module#OpenCloseCaixasModule'
        },
        {
            path: 'reports',
            loadChildren: './reports/reports.module#ReportsModule'
        }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  },
  {
        path: 'relatorios',
        component: SimpleLayoutComponent,
        data: {
            title: 'Relatorios'
        },
        children: [
            {
                path: '',
                loadChildren: './relatorios/relatorios.module#RelatoriosModule',
            }
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
