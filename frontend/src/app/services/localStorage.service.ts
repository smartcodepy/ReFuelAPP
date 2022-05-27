import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  


  constructor() { 

  }

  public   getJson(key:string) {

    let item =localStorage.getItem(key);
    return item? JSON.parse(item):[];
    
  } 

  public getString(key:string){
    let item=localStorage.getItem(key);
    return item?item:"";
  }
  

  public   set(key:string,object:any) {
    localStorage.setItem(key,JSON.stringify(object))
  }
  
  public   setS(key:string,object:any) {
    localStorage.setItem(key,object)
  }

  public   clear() {
    localStorage.clear();
  }

  public   remove(key:string) {
    localStorage.removeItem(key);
  }




 

}
