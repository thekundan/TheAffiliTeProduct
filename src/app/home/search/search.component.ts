import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import {ApiscallService} from '../apiscall.service';
import {Product} from '../../admin/model/product.model';
import {LimitContService} from '../limit-cont.service'
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public IsWait=true;
  pageid=0;
  throttle = 300;
  scrollDistance = 5;
  scrollUpDistance = 5;
  constructor( private connect:ApiscallService,private route:ActivatedRoute,private change : ChangeDetectorRef) {
    route.params.subscribe(val => {
      this.pageid=0;
      this.getData();
    });
   }
  searchinput="";

  ngOnInit(): void {
  }
  
  
  public productdatadtata : Product[];


  search: string;
  getData(): void {
   this.search = this.route.snapshot.paramMap.get('id');
    if(this.search=='search')
       this.getproducts();
     else
        this.serachproducts(this.search);
     
   }
    
   onUp(ev) {
    console.log("scrolled up!");
    
  }
 

  onScrollDown(ev) {
    this.pageid=this.pageid+1;
    this.serachproducts(this.search);
  }


  public productdata : Product[];
    serachproducts(data)
    {
     
     this.IsWait=true;
      this.connect.searchproducts(data,this.pageid).subscribe(data =>
        {
          this.productdata=data;
          if(this.pageid==0)
              this.productdatadtata=data;
          if(this.pageid!=0)
          {
            for (let i = 0; i < this.productdata.length; i++) {
              this.productdatadtata.push(this.productdata[i]);
            }
          }
          this.IsWait=false;
          this.change.detectChanges();
        })
      
    }

  getproducts()
  {
    this.IsWait=true;
    this.productdatadtata=[];
    this.connect.getproducts(0).subscribe(data =>
      {
        this.productdata=data;
        if(this.pageid==0)
            this.productdatadtata=data;
        if(this.pageid!=0)
        {
          for (let i = 0; i < this.productdata.length; i++) {
            this.productdatadtata.push(this.productdata[i]);
          }
        }
        this.IsWait=false;
        this.change.detectChanges();
      })
    
  }
}
