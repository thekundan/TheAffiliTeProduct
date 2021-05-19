import { Component, OnInit } from '@angular/core';
import {Product} from  '../model/product.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {SingleviewComponent} from '../singleview/singleview.component';
import {Limit} from '../../limit';
import {ConnectService} from '../connect.service';
import {Login} from '../model/login.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
public IsWait=true;
  constructor(private connect:ConnectService,private router:Router,private route: ActivatedRoute) { }
  searchinput="";
  ngOnInit(): void {
    this.checklogin();
    this.getData();


  }

  public logindata :Login;
checklogin()
  {
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.connect.checkuserAuthentication().subscribe(data =>{
        this.logindata=data;
        if(this.logindata.status!=200)
        {
         localStorage.clear
         this.router.navigate(['/admin/login']);
 	}
      })
    }
    else{
    this.router.navigate(['/admin/login']);
    }
  } 
  search: string;
getData(): void {
  console.log('this.route.snapshot.paramMap.get(', typeof this.route.snapshot.paramMap.get('id'));
  this.search = this.route.snapshot.paramMap.get('id');
   
  if(this.search=='search')
     this.getproducts();
   else
   {
    this.searchproduct(this.search);
    this.searchinput =this.search;
   }
     

  }

public productdatadtata : Product[];

viewsingleproduct(id: number): void {
  this.router.navigate(['/admin/view',id]);
}
searchproduct(searchval)
{
  this.IsWait=true;
  if(searchval=='')
  {
    this. getproducts();
  }
  else
  {
    this.connect.searchproducts(searchval).subscribe(data =>
      {
        this.productdatadtata=data;
        console.log(this.productdatadtata);
        this.IsWait=false;
      })
    
  }

}

  getproducts()
  {
  
    this.connect.getproducts().subscribe(data =>
      {
        this.productdatadtata=data;
        console.log(this.productdatadtata);
        this.IsWait=false;
      })
    
  }

}

