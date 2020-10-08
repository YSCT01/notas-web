import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user';
import { URL } from './Api';

@Injectable() 
export class UserServices{
    //URL Property
    public url:String;

    constructor(
        //Private http consumer
        private _http:HttpClient
    ) {
        this.url = URL;
    }

    
    //register new user
    signinUser(user:User):Observable<any>{
        var params = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + "/user/addUser", params , {headers:headers});
    }


    loginUser(user:User):Observable<any>{
        var params = user;
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/user/login/', params, {headers: headers});
    }


    //editData
    editUser(user):Observable<any>{
        var params = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + '/user/update/' + user.email, params, {headers: headers});
    }
}