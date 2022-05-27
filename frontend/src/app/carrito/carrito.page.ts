import { CarritoService } from './../services/carrito.service';
import { Detalle } from './../models/Detalle';
import { PedidoService } from './../services/pedido.service';
import { Producto } from './../models/Producto';
import { CategoriaService } from './../services/categoria.service';
import { ProductoService } from './../services/producto.service';
import { LocalStorageService } from './../services/localStorage.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private CarritoService:CarritoService,
    private PedidoService:PedidoService,private CategoriaService:CategoriaService,
    private store:LocalStorageService,private actionSheetCtrl: ActionSheetController, 
    private router: Router) { }
  bandera = false;
  productos= Array<Detalle>();
  categorias=[];

  valoresTotales;


  ngOnInit() {
    this.listarProductos();
    this.valoresTotales=JSON.parse (localStorage.getItem("Totalpedido"));
    console.log(this.valoresTotales)
    this.CarritoService.updateCarritoStatus(false);
  }

  listarProductos(){
    console.log(this.PedidoService.getDetalles());
    this.productos= this.PedidoService.getDetalles();
     
    }
  

  listarCategorias(){
    this.CategoriaService.get().subscribe(data=>{
      this.categorias=data.result;
    })
  }

  onClick(){
 
    return this.bandera = true;

  }


  async openModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Finalizar o continuar",
      buttons: [
        {
          text: "Finalizar Pedido",
          role: "destructive",
        },
        {
          text: "Continuar comprando",
          role: "cancel",
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role === "destructive") {
      this.router.navigateByUrl("/finalizar-pedido");
      return true;
    }

    return false;
  }

}
