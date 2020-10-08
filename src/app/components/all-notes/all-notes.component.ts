import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faEdit, faEraser, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Note } from '../../models/note';
import { NotesServices } from '../../services/note.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css'],
  providers: [NotesServices]
})
export class AllNotesComponent implements OnInit {
  public allNotes: Note[];
  public email:String;
  faE;
  faD;

  constructor(
    private _notesServices: NotesServices
  ) { }

  ngOnInit(): void {
    this.faE = faEdit;
    this.faD = faTrash;
    this.email = localStorage['email'];
    this.getAllNotes(this.email);
    
  }

  //Get All notes from user
  getAllNotes(email){
    this._notesServices.getNotes(email).subscribe(
      response=>{
        if(response){
          this.allNotes = response.note;
          this.allNotes.forEach(note=> {note.date = new Date(note.date);
          note.data = note.date.toDateString();
        });
        }
      },
      error=>{
        console.log(error);
      }
    );
  }


  deleteNote(id){
    
    if(confirm("¿Deseas eliminar esta nota? (Una vez eliminada, no se puede recuperar)")){
      this._notesServices.deleteNote(id).subscribe(
        response=>{
          window.location.reload();
        },
        error=>{
          alert(error.error.text);
          window.location.reload();
        }
      );
      
     
    }
    
  }
  //

}
