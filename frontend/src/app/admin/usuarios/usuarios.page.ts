import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"],
})
export class UsuariosPage implements OnInit {
  usuarios;
  constructor(
    private usuarioService : UsuarioService
  ) {}

  ngOnInit() {
    this.listarUsuarios();
    this.buscarUsuario(event);
  }

  ionViewWillEnter() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((data) => {
      this.usuarios = data.result;
    });
  }

buscarUsuario(value) {
    try {
      this.usuarioService.filtrarUsuario(value).subscribe(data=>{
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
      this.usuarioService.delete(usuario.usu_id)
        .subscribe(() => {
          this.listarUsuarios();
          console.log("Usuario eliminado!");
        });
    }
  }
}
