import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserServices } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpErrorResponse, HttpHeaderResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserServices]
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  session: boolean;

  constructor(
    private _userServices:UserServices,
    private formBuilder:FormBuilder,
  ) {

    this.loginForm = this.formBuilder.group({
      'email': ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      'password':["", [Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9]"), Validators.minLength(5)]],
    });
   }

  ngOnInit(): void {
  }

  loginUser(){
    
    this._userServices.loginUser(this.loginForm.value).subscribe(
      response=>{
        window.localStorage['login'] = true;
        window.localStorage['name'] = response.name;
        window.localStorage['surname'] = response.surname;
        window.localStorage['lastname']= response.lastname;
        window.localStorage['email'] = response.email; 
        window.location.replace('notas');
      },
      error=>{
        alert(error.error.text);
        console.log(error);
      }

    );
    
  }



}
