import { Component, OnInit } from '@angular/core';
import {ApiscallService} from '../apiscall.service';
import {Product} from '../../admin/model/product.model';
import {LimitContService} from '../limit-cont.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public IsWait=true;
  constructor( private connect:ApiscallService,private router:Router,private route: ActivatedRoute) { }
  searchinput="";
  throttle = 300;
  scrollDistance = 5;
  scrollUpDistance = 5;
  ngOnInit(): void {
    this.getproducts();
  }
   pageid=0;
  public productdatadtata : Product[];


  onUp(ev) {
    console.log("scrolled up!");
    
  }
 
  goToLink(url: string){
    window.open(url, "_blank");
}

  onScrollDown(ev) {
    this.pageid=this.pageid+1;
     this.getproducts();
  }


  viewsingleproduct(id:string)
  {
    this.router.navigate(['/product',id]);
  }
  public productdata : Product[];
  getproducts()
  {
  
    this.connect.getproducts(this.pageid).subscribe(data =>
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
      })
    
  }

}
