import { Router } from '@angular/router';
import { LocalStorageService } from './services/localStorage.service';
import { SocketService } from './services/socket.service';
import { CarritoService } from './services/carrito.service';
import { UsuarioService } from './services/usuario.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import{Usuario} from './models/Usuario'
import { IonSplitPane, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { PedidoService } from './services/pedido.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent implements OnInit  {
   env ;
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home',rol:"1" },
    { title: 'Pedidos', url: '/pedidos', icon: 'newspaper' ,rol:"1" },
    { title: 'Mi cuenta', url: '/miCuenta', icon: 'person' ,rol:"1"},
    { title: 'Admin', url: '/admin', icon: 'people',rol:"0" },
    
    
   /*  { title: 'Spam', url: '/folder/Spam', icon: 'warning' }, */
  ];
  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;
  usuario;
  utl;
  constructor(private CarritoService:CarritoService,
    private userService:UsuarioService,
    private pedidoService:PedidoService,
    private LocalStorageService:LocalStorageService,
     router: Router
  ) {
      this.utl=window.location.href.includes("/login")?false:true;

      this.usuario=LocalStorageService.getJson("datosUsuario");
      console.log(this.usuario)
      

  }

  cerrar(){
    this.LocalStorageService.clear();
    this.CarritoService.datos.emit(false);

  }
  ngOnInit(): void {
  
    this.CarritoService.datos.subscribe(x=>{
      this.env=x;
    })
  }
}
