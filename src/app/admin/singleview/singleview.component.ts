import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {ConnectService} from '../connect.service'
import {Product} from '../model/product.model';
import { Router } from '@angular/router';
import {Login} from '../model/login.model'
@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  @ViewChild('scrollDiv') scrollElement: ElementRef;
  constructor(private route: ActivatedRoute,private connect:ConnectService,private router:Router) { }
  id: number;
  public IsWait=true;
  ngOnInit(): void {
    this.checklogin();
    this.getData();
    this.getsingleproducts();
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


  public productdatadtata : Product[];
  public singledata : Product;
  viewsingleproduct(id: number): void {
this.productdatadtata=[];
    this.getsingleproduct(id);
    
  }
getsingleproducts()
{
  this.connect.getsingleproducts(this.id).subscribe(data =>
    {
      this.singledata=data;
      this.IsWait=false;
     })
     this.getproducts();
}
activateproduct(id: number)
{
this.connect.deactiveeproducts(id).subscribe(data =>
  {
    this.getsingleproduct(id);
  });

}
deactivateproduct(id: number)
{
  this.connect.activeeproducts(id).subscribe(data =>
    {
      this.getsingleproduct(id);
    });

}
getsingleproduct(id: number)
{
  this.connect.getsingleproducts(id).subscribe(data =>
    {
      this.singledata=data;
      this.IsWait=false;
     })
     this.getproducts();
}

getproducts()
  {
  
    this.connect.getproducts().subscribe(data =>
      {
        this.productdatadtata=data;
      })
    
  }

  getData(): void {
    console.log('this.route.snapshot.paramMap.get(', typeof this.route.snapshot.paramMap.get('id'));
    this.id = +this.route.snapshot.paramMap.get('id');
  
    }

}
