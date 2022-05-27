import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-productos-crear',
  templateUrl: './productos-crear.page.html',
  styleUrls: ['./productos-crear.page.scss'],
})
export class ProductosCrearPage implements OnInit {
  binding;
  categorias;
  registroUsuarioForm : FormGroup;
  currentCategoria
  constructor(private Router:Router, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:ProductoService,private CategoriaService:CategoriaService) { 

    this.CategoriaService.get().subscribe(x=>{
      this.categorias=x.result;
      this.binding=x.result[0].cat_id;
    })
    this.registroUsuarioForm = this.formBuilder.group({
      "pro_id":'',
      "cat_id":'',
      "pro_precio":'',
      "pro_descripcion":'',
      "pro_iva":'',
      "image":'',
      "pro_nombre":''
    })
  }

  ngOnInit() {

  }


  onChange($event){
    this.binding=$event.detail.value;
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
      this.UsuarioService.add({
        "cat_id":this.binding,
        "pro_precio":Number(this.registroUsuarioForm.value.pro_precio),
        "pro_descripcion":this.registroUsuarioForm.value.pro_descripcion,
        "pro_iva":Number(this.registroUsuarioForm.value.pro_iva),
        "image":this.registroUsuarioForm.value.image,
        "pro_nombre":this.registroUsuarioForm.value.pro_nombre,
     }).subscribe(result=>{
       if(result.success){
         this.presentAlert("producto registrado!!");
         this.Router.navigate(['/home'])
       }
     })
    }
    else{
      this.presentAlert("Datos Invalidos");
    }


  }

}
