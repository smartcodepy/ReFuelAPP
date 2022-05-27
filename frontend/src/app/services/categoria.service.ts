import { LocalStorageService } from './localStorage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  endPoint = environment.url;
  headers ={"x-token":this.LocalStorageService.getString(environment.tokenKey)};
  constructor(public http: HttpClient ,private LocalStorageService:LocalStorageService) { }

  public get(): Observable<any>{
    
    return this.http.get(`${this.endPoint}/categorias/get`,{headers:this.headers});
  }
  public getById(id): Observable<any>{
    
    return this.http.get(`${this.endPoint}/categorias/getById/${id}`,{headers:this.headers});
  }

  public getFilter(text): Observable<any>{
    
    return this.http.get(`${this.endPoint}/categorias/getFilter/${text}`,{headers:this.headers});
  }

  public update(categoria): Observable<any>{
    let body:{categoria}
     return this.http.put(`${this.endPoint}/categorias/update`,categoria,{headers:this.headers},);
   }

   public delete(id): Observable<any>{
    let body:{categoria}
    console.log(id)
     return this.http.delete(`${this.endPoint}/categorias/delete/${id}`,{headers:this.headers},);
   }


  public create(categoria): Observable<any>{
   let body:{categoria}
    return this.http.post(`${this.endPoint}/categorias/create`,categoria,{headers:this.headers},);
  }
}
