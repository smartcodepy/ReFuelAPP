import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoService } from './carrito.service';
import { element } from 'protractor';
import { Pedido } from './../models/pedido';
import { Usuario } from './../models/Usuario';
import { Detalle } from './../models/Detalle';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'stream';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from './localStorage.service';


@Injectable({
  providedIn: 'root'
})
export  class PedidoService {
 public   detalles = new Array <Detalle>();
 public cliente = new Usuario();
 public pedido = new Pedido();
 endPoint = environment.url;
 
  constructor(private CarritoService:CarritoService,private http:HttpClient) { }
  headers ={"x-token":localStorage.getItem(environment.tokenKey)};


  public add(data): Observable<any>{
    
    return this.http.post(`${this.endPoint}/pedidos/post`,data,{headers:this.headers});
  }

  public get(): Observable<any>{
    
    return this.http.get(`${this.endPoint}/pedidos/get`,{headers:this.headers});
  }
  
  public getAll(): Observable<any>{
    
    return this.http.get(`${this.endPoint}/pedidos/getAll`,{headers:this.headers});
  }
  

  public getAllByUser(): Observable<any>{
    let usuario = JSON.parse(localStorage.getItem("datosUsuario"));
    return this.http.get(`${this.endPoint}/pedidos/get/all/usuer/${usuario.usu_id}`,{headers:this.headers});
  }


  public getFilter(text): Observable<any>{
    return this.http.get(`${this.endPoint}/pedidos/get/filter/${text}`,{headers:this.headers});
  }

  public update(id): Observable<any>{
    return this.http.put(`${this.endPoint}/pedidos/put/${id}`,{headers:this.headers});
  }

   getDetalles(){
   let pedido= JSON.parse(localStorage.getItem("pedido"));
   console.log(pedido);
   return (pedido && pedido[0])?pedido:[];
  }

  public getCantidadTotal(){
    let cantidadTotal=0 ;
    for(let i =0; i<this.detalles.length ; i++){
      cantidadTotal+=this.detalles[i].cantidad;
    }
   return cantidadTotal;
  }

  public getTotalPedido(){
    let totalPedido=0 ;
    for(let i =0; i<this.detalles.length ; i++){
      totalPedido+=this.detalles[i].totalGeneral;
    }
    return totalPedido;
  }


  public  validarExistencia(detalle){

  this.detalles= this.getDetalles();
    let nuevo=true;
    console.log(detalle)
    this.detalles.forEach(element => {
      if(element.productoId===detalle.productoId)
      {
        console.log(element.productoId,detalle.productoId)
        element.cantidad+=detalle.cantidad;
        element.valorIva+=detalle.valorIva;
        element.totalGeneral+=detalle.totalGeneral;
        element.totalParcial+=detalle.totalParcial;
        element.image=detalle.image
        nuevo=false;
         return;
      }

    }
   
    );
    if (nuevo)
    this.detalles.push(detalle);

console.log(this.detalles)
   
   this.save();
  }

  public mostrar(){

    let pedido:{
      "clinteId":1,
      "fecha":"2022/01/10",
      "comprobanteId":1,
      "totalParcial":10000,
      "iva":0,
      "totalGeneral":10000,
      "estado":2,
      "gpsX":"1",
      "gpsY":"0",
      
      "detalles":[
          {
          "productoId":1,
          "precio":10000,
          "totalParcial":10000,
          "cantidad":1,
          "iva":0,
          "totalGeneral":10000,
          "ivaPorcent":0,
          "estado":2,
          "obs":""
    
    
    
          },
          {
            "productoId":3,
            "precio":10000,
            "totalParcial":10000,
            "cantidad":1,
            "iva":0,
            "totalGeneral":10000,
            "ivaPorcent":0,
            "estado":2,
            "obs":""
      
      
      
            }
            ,
            {
              "productoId":4,
              "precio":10000,
              "totalParcial":10000,
              "cantidad":1,
              "iva":0,
              "totalGeneral":10000,
              "ivaPorcent":0,
              "estado":2,
              "obs":""
        
        
        
              }
      ]
    }

    return this.http.post(`${this.endPoint}/pedidos/post`,pedido);

 
  }

  public save (){

    if(this.detalles&&this.detalles[0]){
      let Totalpedido ={

        "TotalPedido":this.getTotalPedido(),

        "CantidadTotal":this.getCantidadTotal()

    }

    localStorage.removeItem("pedido");
    localStorage.setItem("pedido",JSON.stringify(this.detalles))
    localStorage.setItem("Totalpedido",JSON.stringify(Totalpedido))
    this.CarritoService.updateCarritoStatus(true);
    }


  }

  getDetalleByProductoId(id){
    this.detalles=this.getDetalles();
  this.detalles.forEach(element => {
    if(element.productoId===id)
    console.log(element)
  });

  }

  limpiarPedido(){
    localStorage.removeItem("pedido");
    localStorage.removeItem("Totalpedido");
    this.CarritoService.updateCarritoStatus(false);
  }

  public generarCabecera(datos){
    let currentDate= new Date();
    let cabecera={
      "fecha":`${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDay()}`,
      "comprobanteId":datos.comprobanteId,
      "totalGeneral":JSON.parse(localStorage.getItem("Totalpedido")).TotalPedido,
      "estado":2,
      "gps":datos.gps,
      "clienteId":JSON.parse(localStorage.getItem("datosUsuario")).usu_id,
      "formaPagoId":datos.formaPagoId

    }
   localStorage.setItem("cabecera",JSON.stringify(cabecera))
  }

  SendPedido(){

    let datosCabecera = JSON.parse(localStorage.getItem("cabecera"));

    let sedDatos={
      detalles:JSON.parse(localStorage.getItem("pedido")),
      datosCabecera
    }
    this.add(sedDatos).subscribe(x=>{
      if(x.result && x.success)
      {
        localStorage.removeItem("cabecera")
        localStorage.removeItem("Totalpedido")
        localStorage.removeItem("pedido")
      }
    })

  }
}
