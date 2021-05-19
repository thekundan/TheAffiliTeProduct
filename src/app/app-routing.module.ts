import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminRoutingModule} from './admin/app-routing.module';
import {HomeRoutingModule} from './home/app-routing.module'
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,AdminRoutingModule,HomeRoutingModule]
})
export class AppRoutingModule { }
