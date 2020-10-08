import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserServices } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[UserServices]
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  
  constructor(
    private formbuilder:FormBuilder,
    private _userServices:UserServices
  ) { 
    this.signinForm = this.formbuilder.group({
      'surname':["", [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      'lastname':["", [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
      'email':["", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      'password': ["", [Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9]"), Validators.minLength(5)]],
      'confirm': ["", [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9]"),Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
  }

  //Register user
  signinUser(){
    if(this.signinForm.get('confirm').value == this.signinForm.get('password').value){
      this._userServices.signinUser(this.signinForm.value).subscribe(
        response=>{
          alert("Usuario registrado correctamente");
        },
        error=>{
          alert(error.error.text);
        }
      );
      this.signinForm.reset();
    }
    else{
      alert("Revisa que tus contraseñas coincidan");
    }
    
  }

  //

}
