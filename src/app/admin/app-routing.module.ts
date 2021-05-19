import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {NavigationComponent} from './navigation/navigation.component';
import {AddproductComponent} from './addproduct/addproduct.component';
import {ProductComponent} from './product/product.component'
import {SingleviewComponent} from './singleview/singleview.component'

const routes: Routes = [
    {
        path:"admin/login",
        component:LoginComponent
      },
      {
        path:"admin", component:NavigationComponent,
                children: [
                {path:"",component:DashboardComponent},
                {path:"dashboard",component:DashboardComponent},
                {path:"product/:id",component:ProductComponent},
                {path:"addproduct/:id",component:AddproductComponent},
                {path:"view/:id",component:SingleviewComponent}
      ]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
