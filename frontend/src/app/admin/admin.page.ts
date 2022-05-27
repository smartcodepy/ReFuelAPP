import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private CarritoService:CarritoService) { }

  ngOnInit() {
    this.CarritoService.datos.emit(false);
  }

  onClick(){
    this.CarritoService.datos.emit(true);
  }

}
