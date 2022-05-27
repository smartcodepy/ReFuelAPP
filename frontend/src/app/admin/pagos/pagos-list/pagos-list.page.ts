import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { CarritoService } from '../../../services/carrito.service';
import { FormasPagoService } from '../../../services/formas-pago.service';

@Component({
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.page.html',
  styleUrls: ['./pagos-list.page.scss'],
})
export class PagosListPage implements OnInit {
  usuarios;
  constructor(
    private usuarioService : FormasPagoService,
    private CarritoService:CarritoService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
    this.CarritoService.datos.emit(false);
  }

  onBack(){
    this.CarritoService.datos.emit(true);
  }

  ionViewWillEnter() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.get().subscribe((data) => {
      this.usuarios = data.result;
    });
  }



  onClick(usuario){
    console.log(usuario);
    this.eliminarUsuario(usuario)
  }

  mostrarDialog(text){
   return window.confirm(text);
  }

   eliminarUsuario(usuario) {
    if (this.mostrarDialog("Seguro que quieres eliminar?")) {
      console.log(usuario)
      this.usuarioService.delete(usuario.fp_Id)
        .subscribe(() => {
          this.listarUsuarios();
        });
    }
  }
}
