import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { LocalStorageService } from './../services/localStorage.service';
import { Usuario } from './../models/Usuario';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario={"email":"","password":""};
  constructor(private LocalStorageService:LocalStorageService,
    private LoginService:LoginService,private router:Router) {

   }

  ngOnInit() {
  }


  

  onClick(){
      this.LoginService.login(this.usuario).then(x=>{
        console.log((<any> x).result)
        if( (<any> x).result){
          this.LocalStorageService.setS("x-token",(<any>x).result.token);
          this.LocalStorageService.set("datosUsuario",(<any>x).result.usuario);
          this.router.navigateByUrl("/home");
        }
      }).catch(error=>{
        alert(error.error.result)
      })
        
      


  }
}
