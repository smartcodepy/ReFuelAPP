import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { Console } from 'console';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
  registroUsuarioForm : FormGroup;
  id;
  usuario;
  constructor(private LocalStorageService:LocalStorageService,private Router:Router, private alertCtrl:AlertController,public formBuilder : FormBuilder ,private UsuarioService:UsuarioService) { 

    this.id=JSON.parse(localStorage.getItem("datosUsuario")).usu_id;
    this.registroUsuarioForm = this.formBuilder.group({
      usu_id:this.id,
      nombre: ([(this.usuario&&this.usuario.usu_nombre)?this.usuario.usu_nombre:'',[Validators.required]]),
      apellido: [''],
      telefono: [(this.usuario&&this.usuario.usu_telefono)?this.usuario.usu_telefono:'',(Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/) )],
      email: [(this.usuario&&this.usuario.usu_email)?this.usuario.usu_email:'',[Validators.required, Validators.email]],
      password: [(this.usuario&&this.usuario.usu_password)?this.usuario.usu_password:'',[Validators.required]],
      documento:[(this.usuario&&this.usuario.usu_documento)?this.usuario.usu_documento:'',[Validators.required]]
    })
    this.UsuarioService.getUsuarioById(this.id).subscribe(x=>{
      this.usuario=x.result;
      this.registroUsuarioForm = this.formBuilder.group({
        usu_id:this.id,
        nombre: ([this.usuario.usu_nombre?this.usuario.usu_nombre:'',[Validators.required]]),
        apellido: [''],
        telefono: [this.usuario.usu_telefono?this.usuario.usu_telefono:'',(Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/) )],
        email: [this.usuario.usu_email?this.usuario.usu_email:'',[Validators.required, Validators.email]],
        password: [this.usuario.usu_password?this.usuario.usu_password:'',[Validators.required]],
        documento:[this.usuario.usu_documento?this.usuario.usu_documento:'',[Validators.required]]
      })
    })


  
  }
  ngOnInit() {
  }


  updateUsuarioLocal(nombre,email){
    let temp=this.LocalStorageService.getJson("datosUsuario");
    temp.usu_nombre=nombre;
    temp.usu_email=email;
    this.LocalStorageService.set("datosUsuario",temp)
  }

  async presentAlert(msg) {
    let alert = this.alertCtrl.create({message:msg,
    buttons: [
      {
        text: 'Ok',
        role: 'ok',
      },]

    });
     (await alert).present();
  }


  guardar(){

    console.log(this.registroUsuarioForm.valid)
    if(this.registroUsuarioForm.valid){
      this.UsuarioService.update(this.id,{
        "usu_id":this.id,
        "usu_nombre":`${this.registroUsuarioForm.value.nombre} ${this.registroUsuarioForm.value.apellido}`,
        "usu_telefono":this.registroUsuarioForm.value.telefono,
        "usu_email":this.registroUsuarioForm.value.email,
        "usu_password":this.registroUsuarioForm.value.password,
        "usu_documento":this.registroUsuarioForm.value.documento,
        "usu_rol":"usuario"
     }).subscribe(result=>{
       if(result.success){
         this.updateUsuarioLocal(this.registroUsuarioForm.value.nombre,this.registroUsuarioForm.value.email)
         this.presentAlert("Usuario Modificado!!");
         this.Router.navigate(['/home'])
       }
     })
    }
    else{
      this.presentAlert("Datos Invalidos");
    }


  }



}
