import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaEditPageRoutingModule } from './categoria-edit-routing.module';

import { CategoriaEditPage } from './categoria-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriaEditPage]
})
export class CategoriaEditPageModule {}
