import { LocalStorageService } from './localStorage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  endPoint = environment.url;
  headers ={"x-token":this.LocalStorageService.getString(environment.tokenKey)};
  constructor(public http: HttpClient ,private LocalStorageService:LocalStorageService) { }
  
  public get(): Observable<any>{
    
    return this.http.get(`${this.endPoint}/producto/get`,{headers:this.headers});
  }

  public getById(id): Observable<any>{
    
    return this.http.get(`${this.endPoint}/producto/getById/${id}`,{headers:this.headers});
  }

  public getTop5(): Observable<any>{
    
    console.log(this.headers)
    return this.http.get(`${this.endPoint}/producto/getTop5`,{headers:this.headers});
  }

  public add(producto):Observable<any>{
    return this.http.post(`${this.endPoint}/producto/add`,producto,{headers:this.headers});

  }

  public update(producto):Observable<any>{
    return this.http.put(`${this.endPoint}/producto/update/${producto.pro_id}`,producto,{headers:this.headers});

  }

  public delete(id):Observable<any>{
    return this.http.delete(`${this.endPoint}/producto/delete/${id}`,{headers:this.headers});

  }

  public getFilter(text):Observable<any>{
    return this.http.get(`${this.endPoint}/producto/getFilter/${text}`,{headers:this.headers});

  }

  public getFilterByCategoria(id):Observable<any>{
    return this.http.get(`${this.endPoint}/producto/getByFilterCategoria/${id}`,{headers:this.headers});

  }
}

