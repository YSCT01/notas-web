import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NotesServices } from '../../services/note.service';
import { Note } from '../../models/note';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-note',
  templateUrl: './detail-note.component.html',
  styleUrls: ['./detail-note.component.css'],
  providers: [NotesServices]
})
export class DetailNoteComponent implements OnInit {
faE;
faR;
author:String;
email:String;
public noteDetails: Note;

  constructor(
    private _notesServices: NotesServices,
    private _route:ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.email = window.localStorage['email'];
    this.faE = faEdit;
    this.faR = faArrowLeft;
    this._route.params.subscribe(params=>{
      var id = params.id;
      this.getNote(id);
      
    });
    
    
  }


  //GetData
  getNote(id){
      this._notesServices.detailNote(id).subscribe(
        response=>{
          this.noteDetails = response.note;
          this.noteDetails.date = new Date(this.noteDetails.date);
          this.noteDetails.data = this.noteDetails.date.toDateString();
         
        },
        error=>{
          alert(error.error.text);
        }
      )
  }

}
