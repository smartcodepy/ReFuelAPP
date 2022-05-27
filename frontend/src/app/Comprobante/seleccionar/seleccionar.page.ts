import { ComprobanteService } from './../../services/comprobante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccionar',
  templateUrl: './seleccionar.page.html',
  styleUrls: ['./seleccionar.page.scss'],
})
export class SeleccionarPage implements OnInit {

  constructor(private comprobanteService: ComprobanteService) { }
  comprobantes;
  ngOnInit() {
  this.comprobanteService.get().subscribe(x=>{
    this.comprobantes=x.result;
  })
  }

}
