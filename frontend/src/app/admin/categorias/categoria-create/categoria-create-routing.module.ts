import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaCreatePage } from './categoria-create.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaCreatePageRoutingModule {}
