import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:String;
  surname:String;
  lastname:String;
  email: String;


  constructor(
    private _route:ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.email = window.localStorage['email'];
    this._route.params.subscribe(params=>{
      var urlemail = params.email;
      console.log(urlemail);
      if(urlemail != this.email){
        window.location.replace('inicio');
      }
    });
    this.surname = window.localStorage['surname'];
    this.lastname = window.localStorage['lastname'];
  }

  logout(){
    window.localStorage['login']=false;
    window.localStorage['name']=null;
    window.localStorage['email']=null;
    window.localStorage['surname']=null;
    window.localStorage['lastname']=null;
    window.location.href='inicio';
  }
  
}
