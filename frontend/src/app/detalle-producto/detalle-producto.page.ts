import { element } from 'protractor';
import { Detalle } from './../models/Detalle';
import { PedidoService } from './../services/pedido.service';
import { Producto } from './../models/Producto';
import { ProductoService } from './../services/producto.service';
import { ContinuarFinalizarModalPage } from "./../continuar-finalizar-modal/continuar-finalizar-modal.page";
import {
  IonRouterOutlet,
  ModalController,
  ActionSheetController,
  NavController,
} from "@ionic/angular";
import { asNativeElements, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-detalle-producto",
  templateUrl: "./detalle-producto.page.html",
  styleUrls: ["./detalle-producto.page.scss"],
})
export class DetalleProductoPage implements OnInit {
  sumaUno = 1;
  RestaUno = 1;
  precio:number = 0;
  producto= new Producto();
  currentId;
  obs=null;
  constructor(
    private modalController: ModalController,
    public routerOutlet: IonRouterOutlet,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private route: ActivatedRoute,
    private ProductoService:ProductoService,
    public PedidoService:PedidoService,private nav: NavController
  ) {}

  ngOnInit() {
  this.currentId=this.route.snapshot.paramMap.get('id');
  this.getProductoById();
  }
  setObrservacion($event){
  this.obs=$event.target.value;
  }

  calcularValorIva(iva,valor){
    if(iva && iva>0)
    return ((iva*valor)/100);
    else return 0;
  }




  addNewDetalle(){
    let temDetalle = new Detalle();
    let valorIva=this.calcularValorIva(this.producto.pro_iva,this.precio);
    temDetalle.cantidad=this.sumaUno;
    temDetalle.precioUnit=Number(this.producto.pro_precio);
    temDetalle.ivaPorcent=this.producto.pro_iva;
    temDetalle.productoId=this.producto.pro_id;
    temDetalle.totalGeneral=Number(this.precio);
    temDetalle.totalParcial=this.precio-valorIva;
    temDetalle.ivaPorcent=this.producto.pro_iva?Number(this.producto.pro_iva):0;
    temDetalle.valorIva=valorIva;
    temDetalle.estado=1;
    temDetalle.obs=(this.obs)?this.obs.trim():"";
    temDetalle.descripcion=this.producto.pro_descripcion;
    temDetalle.producto=this.producto.pro_nombre;
    temDetalle.image=this.producto.image;
    this.PedidoService.validarExistencia(temDetalle);
    this.nav.pop();
  }



  setPrecio(valor){
    this.precio=valor;
  }

  getProductoById(){
    this.ProductoService.getById(this.currentId).
    subscribe(Response=>{
    this.producto=Response.result;
    this.setPrecio(this.producto.pro_precio);
    this.PedidoService.getDetalleByProductoId(this.currentId)
    })
    
  }

  addPlus() {
    console.log("addPlus");
    this.sumaUno = this.sumaUno + 1;
    this.calcularTotal();
    console.log(this.sumaUno, this.precio);
    return this.sumaUno;
  }

  reduceOne() {
    console.log("reduceOne");
    if(this.sumaUno>1)
    {
      this.sumaUno = this.sumaUno - 1;
      this.restarTotal();
    }
  return;

  }

  calcularTotal() {
    console.log("calcularTotal");
    return (this.precio = this.sumaUno * this.producto.pro_precio);
  }

  restarTotal() {
    console.log("restarTotal");
    this.precio = this.precio - this.producto.pro_precio;
    return this.precio;
  }

  async aopenModal() {
  }
}
