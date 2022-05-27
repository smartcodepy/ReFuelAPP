import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {
  constructor(private service:PedidoService) { }

  ocultar=false;
detalles=[];
  ngOnInit() {
   
   this.listar();

}

listar(){
  this.service.getAll().subscribe(x=>{
    this.detalles=x.result;
    if(this.detalles.length>0)
    this.ocultar=true;
    else 
    this.ocultar=false
    console.log(x)
})
}
onClick(id){
this.service.update(id).subscribe(x=>{
  console.log(x);
  this.listar();
})
}
}