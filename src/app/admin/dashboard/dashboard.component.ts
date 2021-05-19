import { Component, OnInit } from '@angular/core';
import {DashBoardConfig} from '../model/dash.model';
import {ConnectService} from '../connect.service'
import {Login} from '../model/login.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public productscount="0";
  public activecount="0";
  public productotdcount="0";
  public deactivecount="0";

  constructor(private connect:ConnectService,private router: Router) { }

  ngOnInit(): void {
    this.checklogin();
   this.getconfiguration();
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


public dashconfig:DashBoardConfig;
  getconfiguration()
  {
    this.connect.getDashBoardConfig().subscribe(data =>
      {
        this.dashconfig=data;
        this.productscount=this.dashconfig.totalproduct;
        this.activecount=this.dashconfig.activeproduct;
        this.deactivecount=this.dashconfig.deactiveproduct;
        this.productotdcount=this.dashconfig.productoftheday;
      })
  }
}
