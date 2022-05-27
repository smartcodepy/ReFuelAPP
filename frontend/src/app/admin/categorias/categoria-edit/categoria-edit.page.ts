import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.page.html',
  styleUrls: ['./categoria-edit.page.scss'],
})
export class CategoriaEditPage implements OnInit {
  registroUsuarioForm : FormGroup;

  id;
categoria;
  constructor(private Router:Router,private ActivatedRoute:ActivatedRoute, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:CategoriaService) { 
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.registroUsuarioForm = this.formBuilder.group({
      descripcion:(['']),
      imagen:[''],
      nombre:['']
    })
  }

  ngOnInit() {
    this.UsuarioService.getById(this.id).subscribe(x=>{
      this.categoria=x.result;
      console.log(x);
      this.registroUsuarioForm = this.formBuilder.group({
        descripcion:([(this.categoria && this.categoria.cat_descripcion)?this.categoria.cat_descripcion:'']),
        imagen:([(this.categoria && this.categoria.image)?this.categoria.image:'']),
        nombre:([(this.categoria && this.categoria.cat_nombre)?this.categoria.cat_nombre:'']),
      })
    })
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

      this.UsuarioService.update({
        "cat_id":this.id,
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
