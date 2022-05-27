import { Producto } from './../models/Producto';
import { CategoriaService } from './../services/categoria.service';
import { ProductoService } from './../services/producto.service';
import { LocalStorageService } from './../services/localStorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-listado',
  templateUrl: './menu-listado.page.html',
  styleUrls: ['./menu-listado.page.scss'],
})
export class MenuListadoPage implements OnInit {

  constructor(private productoService:ProductoService,
    private CategoriaService:CategoriaService,
    private store:LocalStorageService,
    private actionSheetCtrl: ActionSheetController, 
    private router: Router, private ActivatedRoute:ActivatedRoute) { }
  bandera = false;
  valoresTotales;
  productos= Array<Producto>();
  categorias=[];
  currentId
  ngOnInit() {
    this.currentId=this.ActivatedRoute.snapshot.paramMap.get('id');
    this.listarProductos();
    this.valoresTotales=JSON.parse (localStorage.getItem("Totalpedido"));
    this.bandera= this.valoresTotales?true:false;
  }

  listarProductos(){
    if(this.currentId){
this.productoService.getFilterByCategoria(this.currentId).subscribe(data=>{
  this.productos=data.result;
})
    }
    else{
      this.productoService.get().subscribe(data=>{
        this.productos=data.result;
      })
    }

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
