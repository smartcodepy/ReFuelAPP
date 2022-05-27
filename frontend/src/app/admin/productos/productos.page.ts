import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  usuarios;
  constructor(
    private usuarioService : ProductoService,
    private CarritoService:CarritoService,
    private Router:Router
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

  onClickGo(){
    this.Router.navigate(['/productos-crear'])
  }
  onEditar(id){
    console.log(id)
    this.Router.navigate([`productos-editar/${id}`])
  }
   eliminarUsuario(usuario) {
    if (this.mostrarDialog("Seguro que quieres eliminar?")) {
      this.usuarioService.delete(usuario.pro_id)
        .subscribe(() => {
          this.listarUsuarios();
        });
    }
  }
}
