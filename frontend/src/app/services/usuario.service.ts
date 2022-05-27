import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import {LocalStorageService} from '../services/localStorage.service'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  endPoint = environment.url;
  headers ={"x-token":this.LocalStorageService.getString(environment.tokenKey)};
  constructor(public http: HttpClient ,private LocalStorageService:LocalStorageService ) { }

  public listarUsuarios(): Observable<any>{
    
    return this.http.get(`${this.endPoint}/usuario/list`,{headers:this.headers});
  }

  public recuperar(email): Observable<any>{
    
    return this.http.get(`${this.endPoint}/usuario/recuperar/${email}`,{headers:this.headers});
  }

  public filtrarUsuario(texto: String): Observable<any>{
    console.log(texto)
    return this.http.get(`${this.endPoint}/usuario/filter/${texto}`,{headers:this.headers});
  }

  getUsuarioById(id): Observable<any>{
    
    return this.http.get(`${this.endPoint}/usuario/find/${id}`,{headers:this.headers});
  }

  
  crearUsuario(usuario){
    const url = `${this.endPoint}/create`;
    return this.http.post(url,usuario)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  public update(id,data): Observable<any> {
    return this.http.put(`${this.endPoint}/usuario/update/${id}`,data,{headers:this.headers});
  }
  
  public delete(id): Observable<any> {
    return this.http.delete(`${this.endPoint}/usuario/remove/${id}`,{headers:this.headers});
  }
  public registrarUsuario(data): Observable<any> {
    return this.http.post(`${this.endPoint}/usuario/registrar`,data,{headers:this.headers});
  }
  public registrarUsuarioAdmin(data): Observable<any> {
    return this.http.post(`${this.endPoint}/usuario/registrar/adm`,data,{headers:this.headers});
  }

  
  actualizarUsuario(org_codigo, usuario) {
    return this.http.put('http://localhost:3000/usuario/update/' + org_codigo, usuario);
  }

 

}
