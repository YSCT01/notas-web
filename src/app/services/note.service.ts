import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import{Note} from '../models/note';
import {URL} from './Api';

@Injectable()
export class NotesServices{
    public url:String;
    constructor(
        private _http: HttpClient
    ){
        this.url = URL;
    }
    //Get all notes
    getNotes(email):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + "/note/allNotes/"+ email, {headers: headers});
    }

    //Add notes
    newNote(note):Observable<any>{
        var params = JSON.stringify(note);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + '/note/addNote/', params, {headers: headers});
    }

    //Delete note
    deleteNote(id):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + '/note/delete/'+id, {headers:headers});
    }

    //Details of note
    detailNote(id):Observable<any>{
        var headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.get(this.url + '/note/details/'+ id, {headers: headers});
    }

    //Edit note
    editNote(note, id):Observable<any>{
        var params = JSON.stringify(note);
        var headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + '/note/edit/'+id, params, {headers: headers});
    }
}