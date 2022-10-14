import { CarritoService } from './../services/carrito.service';
import { CategoriaService } from './../services/categoria.service';
import { ProductoService } from './../services/producto.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productos=[];
  categorias=[];
  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService, 
    menu: MenuController,
    private CarritoService:CarritoService) { }
 
  show=true;
  ngOnInit() {
    this.listarCategorias();
    this.listarPorductos();
    this.CarritoService.datos.emit(true);
    
  }

  onHideShow(){
    this.CarritoService.updateCarritoStatus(this.show);
    this.show=!this.show;
  }
  listarPorductos(){
    this.productoService.getTop5().subscribe(data=>{
      this.productos=data.result;
    })
  }

  onChange($event){
    console.log($event)
    if($event.detail && $event.detail.value && $event.detail.value.length>0)
    this.productoService.getFilter($event.detail.value).subscribe(x=>{
      this.productos=x.result;
    })
    else {
      this.listarPorductos();
    }
  }
  

  listarCategorias(){
    this.categoriaService.get().subscribe(data=>{
      this.categorias=data.result;
    })
  }
  
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 2.5,
  };


}
