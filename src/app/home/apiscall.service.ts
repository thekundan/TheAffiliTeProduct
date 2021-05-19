
import { Injectable } from '@angular/core';
import {Product} from '../admin/model/product.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiscallService {

  constructor(private http:HttpClient) { }

  getproducts(pageid){
    return this.http.get <any>("/api/getproducts/"+pageid);
}
getproductbyid(id: number){
  return this.http.get <any>("/api/search/"+id);
}
searchproducts(data,pageid){
  return this.http.get <any>("/api/searchtext/"+data+"/"+pageid);
}

}
