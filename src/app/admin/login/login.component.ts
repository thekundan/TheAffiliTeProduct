import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {ConnectService} from '../connect.service';
import {Login} from '../model/login.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  public logindata :Login;

  constructor(private authService: SocialAuthService,private connectser:ConnectService,private router: Router) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
   
    this.onlogin("Google");
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this. onlogin("Facebook");
  }

  signOut(): void {
    this.authService.signOut();
  }


  async onlogin(data)
  {
    this.authService.authState.subscribe((user) => {
      
      this.user = user;
      this.loggedIn = (user != null);

     this.connectser.getCandidateSocialLogin(user.authToken,user.id,data,this.user.firstName,this.user.lastName,this.user.photoUrl).subscribe(
        data=>{
          this.logindata=data;
          if(this.logindata.status==200)
          {
            localStorage.setItem("jwstoken", this.logindata.jwstoken);
            localStorage.setItem("profileurl", this.logindata.profileurl);
            localStorage.setItem("username", this.logindata.username);
            this.router.navigate(['/admin/dashboard']);
          }

        });
     
    });

  }

checklogin()
  {
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.connectser.checkuserAuthentication().subscribe(data =>{
        this.logindata=data;
        if(this.logindata.status==200)
        {
          localStorage.setItem("jwstoken", this.logindata.jwstoken);
          localStorage.setItem("profileurl", this.logindata.profileurl);
          localStorage.setItem("username", this.logindata.username);
          this.router.navigate(['/admin']);
        }
      })
    }
    else{
      this.signOut();
    }
  }
ngOnInit(): void {
 this.checklogin();
   
  }

}
