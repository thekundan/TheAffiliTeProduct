import { Component, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  isShown:boolean=false;
  searchinput="";
  constructor(private router:Router) {

  }
  findbycategory(data)
  {
   this.router.navigate(['/view',data]);
  }

  ngOnInit(): void {
  }
  searchproduct(data)
  {
    this.searchinput=data;
  if(data=='')
   this.router.navigate(['/view',"search"]);
  else
    this.router.navigate(['/view',data]);
  }
  

}
