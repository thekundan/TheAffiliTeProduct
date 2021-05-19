import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule} from  '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { ViewComponent } from './view/view.component';
import { HomeRoutingModule } from './app-routing.module';
import {LimitContService} from './limit-cont.service';
import { SearchComponent } from './search/search.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SingleviewComponent } from './singleview/singleview.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [NavigationComponent, ViewComponent,LimitContService, SearchComponent, SingleviewComponent, AboutComponent, ContactComponent],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HomeRoutingModule,
    NavbarModule, WavesModule, ButtonsModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    CommonModule
  ]
})
export class HomeModule { }
