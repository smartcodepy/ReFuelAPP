import { HttpClient } from '@angular/common/http';
import { AdminPage } from './../../admin.page';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

 
  id:any;
  usuario;
  editarUsuarioForm: FormGroup;
  usuarioResult;
  sanitizedImg;
  BmdFile_strbase64 : SafeResourceUrl;
  myImage64;
  resultadoImagen;
  
  photo = "https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png";
  apiUrl = 'http://localhost:3000/usuario/find/';
  apiUrlGet = 'http://localhost:3000/upload/';
  
  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public modalController: ModalController,
    public http: HttpClient
    ) {

      this.editarUsuarioForm = this.formBuilder.group({
        usu_nombre: [(this.usuarioResult&& this.usuarioResult.usu_nombre)?this.usuarioResult.usu_nombre:''],
        usu_email:(this.usuarioResult&& this.usuarioResult.usu_email)?this.usuarioResult.usu_email:'',
        usu_telefono: (this.usuarioResult&& this.usuarioResult.usu_telefono)?this.usuarioResult.usu_telefono:'',
        usu_password: '',
        usu_documento:(this.usuarioResult&& this.usuarioResult.usu_documento)?this.usuarioResult.usu_documento:'',
        usu_rol:    (this.usuarioResult&& this.usuarioResult.usu_rol)?this.usuarioResult.usu_rol:'usuario',
      });
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
   

 
     }

/*      myReader.onloadend = (e) => {
     this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(myReader.result);
     console.log(this.base64Image);
   } */
resss;
  ngOnInit() {
    this.getUsuario(this.id);

    console.log(this.id, 'este es el iddddddd');
    //console.log('USUARIO IMAGENNNNN',this.usuarioResult);
  }
  getUsuario(codigo: any){
    this.usuarioService.getUsuarioById(codigo)
    .subscribe(res => {

      this.usuarioResult = res.result;
      this.editarUsuarioForm = this.formBuilder.group({
        usu_nombre: [(this.usuarioResult&& this.usuarioResult.usu_nombre)?this.usuarioResult.usu_nombre:''],
        usu_email:(this.usuarioResult&& this.usuarioResult.usu_email)?this.usuarioResult.usu_email:'',
        usu_telefono: (this.usuarioResult&& this.usuarioResult.usu_telefono)?this.usuarioResult.usu_telefono:'',
        usu_password: '',
        usu_documento:(this.usuarioResult&& this.usuarioResult.usu_documento)?this.usuarioResult.usu_documento:'',
        usu_rol:    (this.usuarioResult&& this.usuarioResult.usu_rol)?this.usuarioResult.usu_rol:'usuario',
      });

      console.log(this.usuarioResult)
    }
    );
  }

  

 
  editarUsuario() {
    console.log('codigo id metodo update', this.id);
      this.usuarioService.update(this.id, this.editarUsuarioForm.value)
        .subscribe((res) => {
          console.log(res);
          this.editarUsuarioForm.reset();
          this.router.navigate(['/admin']);
        });

  }

  openOptionSelection(){


  }

}
