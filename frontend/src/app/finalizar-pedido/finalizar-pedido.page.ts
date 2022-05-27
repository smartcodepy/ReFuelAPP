import { LocalStorageService } from './../services/localStorage.service';
import { Detalle } from './../models/Detalle';
import { FormasPagoService } from './../services/formas-pago.service';
import { ComprobanteService } from './../services/comprobante.service';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.page.html',
  styleUrls: ['./finalizar-pedido.page.scss'],
})
export class FinalizarPedidoPage implements OnInit {

  constructor(private PedidoService:PedidoService,
    private LocalStorageService:LocalStorageService,
    private comprobanteService: ComprobanteService,private pagosService:FormasPagoService) { }
  comprobantes;
  binding;
  medioPago;
  bindingPago;
  productos= Array<Detalle>();
  totalGeneral=0;
  cantidadGeneral=0;
gps;
  ngOnInit() {

    
    let valoreFromStorage=this.LocalStorageService.getJson("Totalpedido");

    this.totalGeneral=  Number(valoreFromStorage.TotalPedido);
    this.cantidadGeneral=Number(valoreFromStorage.CantidadTotal)

    const ok =(position)=>{
      this.gps=`${position.coords.latitude},${position.coords.longitude}`
      console.log(position.coords.latitude,position.coords.longitude);
    }
    this.listarProductos();


    const error=()=>{
    alert("error")
    }
    navigator.geolocation.getCurrentPosition(ok,error);

    this.getComprobantes();
    this.getPagos();
  }


  listarProductos(){
    this.productos= this.PedidoService.getDetalles();
     
    }

  getComprobantes(){
    this.comprobanteService.get().subscribe(x=>{
      this.comprobantes=x.result;
      this.binding=this.comprobantes[0].com_id;
      console.log(this.comprobantes,this.binding)
    })
  }

  generarCabecera(){
    let datos={
      "gps":this.gps,
      "comprobanteId":this.binding,
      "formaPagoId":this.bindingPago
    }
  this.PedidoService.generarCabecera(datos);
  }

  sendPedido(){
    this.generarCabecera();
    this.PedidoService.SendPedido()
  }

  getPagos(){
    this.pagosService.get().subscribe(x=>{
      this.medioPago=x.result;
      this.bindingPago=this.medioPago[0].fp_Id;
      console.log(this.comprobantes,this.binding)
    })
  }
  onChange($event){
    console.log($event)
  }
  onChangePago($event){

  }
 

}
