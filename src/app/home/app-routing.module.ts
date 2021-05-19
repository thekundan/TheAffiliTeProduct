import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {ViewComponent} from './view/view.component';
import {SearchComponent} from './search/search.component';
import {SingleviewComponent} from './singleview/singleview.component';
import {AboutComponent} from './about/about.component';
const routes: Routes = [
  
  {
    path:"", component:NavigationComponent,
            children: [
            {path:"",component:ViewComponent},
            {path:"about",component:AboutComponent},
            {path:"view/:id",component:SearchComponent},
            {path:"product/:id",component:SingleviewComponent}
            ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
