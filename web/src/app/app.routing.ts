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
            path: 'cadastro/produtos',
            loadChildren: './cadastro/produtos/produtos.module#ProdutosModule',
        },
        {
            path: 'cadastro/clients',
            loadChildren: './cadastro/clients/clients.module#ClientsModule',
        },
        {
            path: 'user',
            loadChildren: './user/user.module#UserModule',
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
        path: 'users',
        component: SimpleLayoutComponent,
        data: {
            title: 'Login'
        },
        children: [
            {
                path: '',
                loadChildren: './user/user.module#UserModule',
            }
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
