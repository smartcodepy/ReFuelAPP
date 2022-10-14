import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { LocalStorageService } from './../services/localStorage.service';
import { Usuario } from './../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { resourceLimits } from 'worker_threads';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario={"email":"","password":""};
  constructor(private LocalStorageService:LocalStorageService,
    private LoginService:LoginService,private router:Router,private us:UsuarioService) {

   }

  ngOnInit() {
  }


  

  onClick(){
      this.LoginService.login(this.usuario).then(x=>{
        console.log((<any> x).result)
        if( (<any> x).result){

          if((<any>x).result.usuario.usu_rol==='admin'){
            this.us.admin.emit(true);
          }
          else
          this.us.admin.emit(false);

          this.LocalStorageService.setS("x-token",(<any>x).result.token);
          this.LocalStorageService.set("datosUsuario",(<any>x).result.usuario);
          this.router.navigateByUrl("/home");
        }
      }).catch(error=>{
        alert(error.error.result)
      })
        
      


  }
}
