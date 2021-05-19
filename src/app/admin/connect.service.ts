import { Injectable } from '@angular/core';
import {Product} from './model/product.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  constructor(private http:HttpClient) {}

  getCandidateSocialLogin(token :string ,userid :string , socialacc : string, firstname : string, lastname : string, profileurl : string){
    const fd = new FormData();
      fd.append('token',token);
      fd.append('userid',userid);
      fd.append('socialacc',socialacc);
      fd.append('firstname',firstname);
      fd.append('lastname',lastname);
      fd.append('profileurl', profileurl);
      return this.http.post<any>( '/api/sociallogin',fd);
  }

  addproduct(affiliatewebsite :string ,category :string , subcategory : string, productname : string, weblink : string, imagename : string, origprice : string, offerprice : string, longdescription : string){
    const fd = new FormData();
      fd.append('affiliatewebsite',affiliatewebsite);
      fd.append('category',category);
      fd.append('subcategory',subcategory);
      fd.append('productname',productname);
      fd.append('weblink',weblink);
      fd.append('imagename',imagename);
      fd.append('origprice',origprice);
      fd.append('offerprice',offerprice);
      fd.append('longdescription',longdescription);
   

      const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
      return this.http.post<any>( '/api/AddyourProduct',fd,{headers});
  }

  uploadimage(image :File ){
    const fd = new FormData();
      fd.append('files',image);
     
      return this.http.post<any>( '/api/AddyourProductimage',fd);
  }

getproducts(){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get <any>("/api/getuserproduct",{headers});
}


searchproducts(value){
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/searchusertext/"+value,{headers});
}
deactiveeproducts(id: number){
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/deactiveyourproduct/"+id,{headers});
}
activeeproducts(id: number){
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/activateproduct/"+id,{headers});
}
getsingleproducts(id: number){
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/getsingleProduct/"+id,{headers});
}


checkuserAuthentication(){
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/checkAuth",{headers});
 }
getDashBoardConfig()
{
  const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
  return this.http.get <any>("/api/dashboard",{headers});
}

}
