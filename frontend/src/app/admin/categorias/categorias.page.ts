import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  usuarios;
  constructor(
    private usuarioService : CategoriaService,
    private CarritoService:CarritoService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
    this.buscarUsuario(event);
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

buscarUsuario(value) {
    try {
      this.usuarioService.getFilter(value).subscribe(data=>{
        this.usuarios=data.result;
      })
      
    } catch (error) {
      alert(error.message)
    }
   
  }
  onChange(event) {
    try {

       if(event.detail.value.trim().length>0){
        this.buscarUsuario(event.detail.value);
       }
       else{
         this.listarUsuarios();
       }
      
    } catch (error) {
      
    }
   
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
      this.usuarioService.delete(usuario.cat_id)
        .subscribe(() => {
          this.listarUsuarios();
        });
    }
  }
}
