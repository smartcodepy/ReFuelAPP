import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-productos-editar',
  templateUrl: './productos-editar.page.html',
  styleUrls: ['./productos-editar.page.scss'],
})
export class ProductosEditarPage implements OnInit {
  binding;
  producto;
  categorias;
  registroUsuarioForm : FormGroup;
  currentCategoria
  id;
  constructor(private Router:Router,private ActivatedRoute:ActivatedRoute, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:ProductoService,private CategoriaService:CategoriaService) { 

    this.registroUsuarioForm = this.formBuilder.group({
      "pro_id":[(this.producto && this.producto.pro_id)?this.producto.pro_id:''],
      "cat_id":[(this.producto &&this.producto.cat_id)?this.producto.cat_id:''],
      "pro_precio":[(this.producto &&this.producto.pro_precio)?this.producto.pro_precio:''],
      "pro_descripcion":[(this.producto &&this.producto.pro_descripcion)?this.producto.pro_descripcion:''],
      "pro_iva":[(this.producto &&this.producto.pro_iva)?this.producto.pro_iva:''],
      "image":[(this.producto &&this.producto.image)?this.producto.image:''],
      "pro_nombre":[(this.producto && this.producto.pro_nombre)?this.producto.pro_nombre:''] });

    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.UsuarioService.getById(this.id).subscribe(x=>{
      this.producto=x.result;
      console.log(this.producto)

      
    this.registroUsuarioForm = this.formBuilder.group({
      "pro_id":[(this.producto && this.producto.pro_id)?this.producto.pro_id:''],
      "cat_id":[(this.producto &&this.producto.cat_id)?this.producto.cat_id:''],
      "pro_precio":[(this.producto &&this.producto.pro_precio)?this.producto.pro_precio:''],
      "pro_descripcion":[(this.producto &&this.producto.pro_descripcion)?this.producto.pro_descripcion:''],
      "pro_iva":[(this.producto &&this.producto.pro_iva)?this.producto.pro_iva:''],
      "image":[(this.producto &&this.producto.image)?this.producto.image:''],
      "pro_nombre":[(this.producto && this.producto.pro_nombre)?this.producto.pro_nombre:''] });
    })

    this.CategoriaService.get().subscribe(x=>{
      this.categorias=x.result;
      this.binding=x.result[0].cat_id;
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
      this.UsuarioService.update({
        "cat_id":this.binding,
        "pro_precio":Number(this.registroUsuarioForm.value.pro_precio),
        "pro_descripcion":this.registroUsuarioForm.value.pro_descripcion,
        "pro_iva":Number(this.registroUsuarioForm.value.pro_iva),
        "image":this.registroUsuarioForm.value.image,
        "pro_nombre":this.registroUsuarioForm.value.pro_nombre,
     }).subscribe(result=>{
       if(result.success){
         this.presentAlert("producto editado!!");
         this.Router.navigate(['/home'])
       }
     })
    }
    else{
      this.presentAlert("Datos Invalidos");
    }


  }

}