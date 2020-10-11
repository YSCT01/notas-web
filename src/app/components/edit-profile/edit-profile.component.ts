import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserServices]
})
export class EditProfileComponent implements OnInit {
modifyForm:FormGroup;
surname:String;
lastname:String;
email:String;

  constructor(
    private _userServices:UserServices,
    private _formBuilder: FormBuilder,
    private _route:ActivatedRoute
  ) { 
this.modifyForm = this._formBuilder.group({
  'surname':["", [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
  'lastname':["", [Validators.required, Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]],
  
});

  }

  ngOnInit(): void {
    this.surname = window.localStorage['surname'];
    this.lastname = window.localStorage['lastname'];
    this.email= window.localStorage['email'];
    this.modifyForm.get('surname').setValue(this.surname);
    this.modifyForm.get('lastname').setValue(this.lastname);
    this._route.params.subscribe(params=>{
      var prof = params.email;
      if(prof != this.email){
        window.location.replace("inicio");
      }
    })
  }


  //Update data
  updateData(){
    this._userServices.editUser(this.modifyForm.value).subscribe(
      response=>{
        window.localStorage['surname'] = this.modifyForm.get('surname').value;
        window.localStorage['lastname'] = this.modifyForm.get('lastname').value;
        window.localStorage['name'] = this.modifyForm.get('surname').value + "  " + this.modifyForm.get('lastname').value;
        alert("Usuario actualizado correctamente");
        window.location.replace('notas');
      },
      error=>{
        window.localStorage['surname'] = this.modifyForm.get('surname').value;
        window.localStorage['lastname'] = this.modifyForm.get('lastname').value;
        window.localStorage['name'] = this.modifyForm.get('surname').value + "  " + this.modifyForm.get('lastname').value;
        alert("Usuario actualizado correctamente");
        window.location.replace('notas');
      }
    );
   
  }

}
