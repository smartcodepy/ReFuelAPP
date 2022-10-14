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
detalles= new Array();
  ngOnInit() {
   
    this.service.getAllByUser().subscribe(x=>{

        x.result.forEach(element => {
          element.detalles.forEach(element2 => {
            this.detalles.push(element2)
          });
        });

      console.log(x.result)
    
  })

}
}
