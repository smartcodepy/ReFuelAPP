import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  registroUsuarioForm : FormGroup;

  constructor(private Router:Router, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:UsuarioService) { 

    this.registroUsuarioForm = this.formBuilder.group({
      rol:(['',[Validators.required]]),
      nombre: (['',[Validators.required]]),
      apellido: [''],
      telefono: ['',(Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/) )],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      documento:['',[Validators.required]]
    })
  }

  ngOnInit() {

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


  registrar(){

    console.log(this.registroUsuarioForm.valid)
    if(this.registroUsuarioForm.valid){
      this.UsuarioService.registrarUsuario({
        "rol":([this.registroUsuarioForm.value.rol]),
        "usu":`${this.registroUsuarioForm.value.nombre} ${this.registroUsuarioForm.value.apellido}`,
        "telefono":this.registroUsuarioForm.value.telefono,
        "email":this.registroUsuarioForm.value.email,
        "pass":this.registroUsuarioForm.value.password,
        "docu":this.registroUsuarioForm.value.documento,
     }).subscribe(result=>{
       if(result.success){
         this.presentAlert("Usuario registrado!!");
         this.Router.navigate(['/admin'])
       }
     })
    }
    else{
      this.presentAlert("Datos Invalidos");
    }


  }

}
