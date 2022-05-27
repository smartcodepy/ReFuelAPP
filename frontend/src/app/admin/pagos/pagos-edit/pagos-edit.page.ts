import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormasPagoService } from '../../../services/formas-pago.service';

@Component({
  selector: 'app-pagos-edit',
  templateUrl: './pagos-edit.page.html',
  styleUrls: ['./pagos-edit.page.scss'],
})
export class PagosEditPage implements OnInit {
  registroUsuarioForm : FormGroup;

  id;
categoria;
  constructor(private Router:Router,private ActivatedRoute:ActivatedRoute, private alertCtrl:AlertController,public formBuilder : FormBuilder,private UsuarioService:FormasPagoService) { 
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.registroUsuarioForm = this.formBuilder.group({
      descripcion:([''])
    })
  }

  ngOnInit() {
    this.UsuarioService.getById(this.id).subscribe(x=>{
      this.categoria=x.result;
      console.log(x);
      this.registroUsuarioForm = this.formBuilder.group({
        descripcion:([(this.categoria && this.categoria.fp_descripcion)?this.categoria.fp_descripcion:'']),
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
        "fp_Id":this.id,
        "fp_descripcion":this.registroUsuarioForm.value.descripcion,
     }).subscribe(result=>{
       if(result.success){
         this.presentAlert("Medio de pago registrado!!");
         this.Router.navigate(['/home'])
       }
     })
 
 


  }
}