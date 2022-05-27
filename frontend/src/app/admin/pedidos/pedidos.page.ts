import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(private service:PedidoService) { }

pedido;
detalles;
  ngOnInit() {
   
    this.service.getAllByUser().subscribe(x=>{
        this.detalles=x.result.detalles;
        this.pedido=x.result;
  })

}
}
