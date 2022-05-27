import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosCrearPageRoutingModule } from './productos-crear-routing.module';

import { ProductosCrearPage } from './productos-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosCrearPage]
})
export class ProductosCrearPageModule {}
