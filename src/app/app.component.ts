import { Component, OnInit } from '@angular/core';
import {RouterLink, Router, Route} from '@angular/router';
import { User } from './models/user';
import { faFacebookF, faGithub, faInstagram, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-notes';
  loggeduser: string;
  name:String;
  email:String;
  faF;
  faT;
  faW;
  faI;
  faG;

  ngOnInit():void{
    this.logged();
    this.faF = faFacebookF;
    this.faI = faInstagram;
    this.faW = faWhatsapp;
    this.faT = faTwitter;
    this.faG = faGithub;
    
  }

  logged(){
    this.loggeduser = window.localStorage['login'];
    if(this.loggeduser){
      this.name = window.localStorage['name'];
      this.email = window.localStorage['email'];
    }
  }

  logout(){
    window.localStorage['login']=false;
    window.localStorage['name']=null;
    window.localStorage['email']=null;
    window.localStorage['surname']=null;
    window.localStorage['lastname']=null;
    this.loggeduser = 'false';
    window.location.href='inicio';
  }

}
