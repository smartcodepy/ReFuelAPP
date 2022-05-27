import { Router } from '@angular/router';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  registroUsuarioForm : FormGroup;

  constructor(private Router:Router, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:UsuarioService) { 

    this.registroUsuarioForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
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
console.log(this.registroUsuarioForm.value.email)
    console.log(this.registroUsuarioForm.valid)
    if(this.registroUsuarioForm.valid){
      this.UsuarioService.recuperar(
        this.registroUsuarioForm.value.email
     ).subscribe(result=>{
     })
         this.presentAlert("Si el email es correcto recibirás un mensaje de recuperación.");
         this.Router.navigate(['/login'])
     
    



  }

}

}