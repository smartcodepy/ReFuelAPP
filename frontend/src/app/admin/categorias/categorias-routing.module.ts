import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasPage } from './categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  },  {
    path: 'categoria-edit',
    loadChildren: () => import('./categoria-edit/categoria-edit.module').then( m => m.CategoriaEditPageModule)
  },
  {
    path: 'categoria-create',
    loadChildren: () => import('./categoria-create/categoria-create.module').then( m => m.CategoriaCreatePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasPageRoutingModule {}
