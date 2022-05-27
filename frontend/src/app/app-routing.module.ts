import { EditarUsuarioPageModule } from './admin/usuarios/editar-usuario/editar-usuario.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductosCrearPageModule } from './admin/productos-crear/productos-crear.module';
import { ProductosEditarPageModule } from './admin/productos-editar/productos-editar.module';
import { PedidosPendientesPageModule } from './admin/pedidos-pendientes/pedidos-pendientes.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'usuario-creado',
    loadChildren: () => import('./registro-usuario/usuario-creado/usuario-creado.module').then( m => m.UsuarioCreadoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro-usuario',
    loadChildren: () => import('./registro-usuario/registro-usuario.module').then( m => m.RegistroUsuarioPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
  ,
  {
    path: 'admin/usuarios/editar-usuario/:id',
    loadChildren: () => import('./admin/usuarios/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./admin/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'menu-listado',
    loadChildren: () => import('./menu-listado/menu-listado.module').then( m => m.MenuListadoPageModule)
  },
  {
    path: 'menu-listado/:id',
    loadChildren: () => import('./menu-listado/menu-listado.module').then( m => m.MenuListadoPageModule)
  },
  {
    path: 'detalle-producto/:id',
    loadChildren: () => import('./detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'continuar-finalizar-modal',
    loadChildren: () => import('./continuar-finalizar-modal/continuar-finalizar-modal.module').then( m => m.ContinuarFinalizarModalPageModule)
  },
  {
    path: 'finalizar-pedido',
    loadChildren: () => import('./finalizar-pedido/finalizar-pedido.module').then( m => m.FinalizarPedidoPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },

  {
    path: 'seleccionar',
    loadChildren: () => import('./Comprobante/seleccionar/seleccionar.module').then( m => m.SeleccionarPageModule)
  }
,
  {
    path: 'miCuenta',
    loadChildren: () => import('./admin/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  {
    path:'productos-crear',
    loadChildren: () => import('./admin/productos-crear/productos-crear.module').then( m => ProductosCrearPageModule)
  }
 ,
 {
  path:'productos-editar/:id',
  loadChildren: () => import('./admin/productos-editar/productos-editar.module').then( m => ProductosEditarPageModule)
},
{
  path:'pendientes',
  loadChildren: () => import('./admin/pedidos-pendientes/pedidos-pendientes.module').then( m => PedidosPendientesPageModule)
},  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
