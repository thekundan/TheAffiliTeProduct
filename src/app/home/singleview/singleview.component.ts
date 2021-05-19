import { Component, OnInit } from '@angular/core';
import {Product} from  '../../admin/model/product.model';
import { Router } from '@angular/router';
import {Limit} from '../../limit';
import { ActivatedRoute } from '@angular/router';
import {ApiscallService} from '../apiscall.service';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  public IsWait=true;
  constructor(private connect:ApiscallService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }
  searchinput="";
  search: string;
  getData(): void {
    this.search = this.route.snapshot.paramMap.get('id');
      this.searchproduct(this.search);
      this.getproducts();
      }
    public productdatadtata : Product[];
    public singledata : Product;
    searchproduct(searchval)
    {
      this.IsWait=true;
      if(searchval=='')
      {
        this. getproducts();
      }
      else
      {
        this.connect.getproductbyid(searchval).subscribe(data =>
          {
            this.singledata=data;
            this.IsWait=false;
          })
        
      }
    
    }
    goToLink(url: string){
      window.open(url, "_blank");
  }
  viewsingleproduct(id:string)
  {
    this.singledata=null;
    this.productdatadtata=null;
    this.searchproduct(id);
    this.getproducts();
  }
  getproducts()
  {
  
    this.connect.getproducts(0).subscribe(data =>
      {
        this.productdatadtata=data;
        this.IsWait=false;
      })
    
  }
}
