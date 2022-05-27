import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'categorias-create',
    loadChildren: () => import('./categorias/categoria-create/categoria-create.module').then( m => m.CategoriaCreatePageModule)
  },
  {
    path: 'categorias-edit/:id',
    loadChildren: () => import('./categorias/categoria-edit/categoria-edit.module').then( m => m.CategoriaEditPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path: 'pedidos-pendientes',
    loadChildren: () => import('./pedidos-pendientes/pedidos-pendientes.module').then( m => m.PedidosPendientesPageModule)
  },
  {
    path: 'pagos-list',
    loadChildren: () => import('./pagos/pagos-list/pagos-list.module').then( m => m.PagosListPageModule)
  },
  {
    path: 'pagos-create',
    loadChildren: () => import('./pagos/pagos-create/pagos-create.module').then( m => m.PagosCreatePageModule)
  },
  {
    path: 'pagos-edit/:id',
    loadChildren: () => import('./pagos/pagos-edit/pagos-edit.module').then( m => m.PagosEditPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
