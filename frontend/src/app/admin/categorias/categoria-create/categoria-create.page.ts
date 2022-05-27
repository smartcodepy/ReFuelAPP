import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.page.html',
  styleUrls: ['./categoria-create.page.scss'],
})
export class CategoriaCreatePage implements OnInit {

  registroUsuarioForm : FormGroup;

  constructor(private Router:Router, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:CategoriaService) { 

    this.registroUsuarioForm = this.formBuilder.group({
      descripcion:(['']),
      imagen:[''],
      nombre:['']
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

      this.UsuarioService.create({
        "cat_descripcion":this.registroUsuarioForm.value.descripcion,
        "cat_nombre":this.registroUsuarioForm.value.nombre,
        "image":this.registroUsuarioForm.value.imagen
     }).subscribe(result=>{
       if(result.success){
         this.presentAlert("Categoria registrada!!");
         this.Router.navigate(['/home'])
       }
     })
 
 


  }

}
