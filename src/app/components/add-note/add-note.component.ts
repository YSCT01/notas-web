import { Component, OnInit } from '@angular/core';
import { NotesServices} from '../../services/note.service';
import { Note } from '../../models/note';
import {FormGroup, FormBuilder} from '@angular/forms';
import { faCheck, faTimes,  } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  providers: [NotesServices]
})
export class AddNoteComponent implements OnInit {
faD;
faS;
public newNote: Note;
 noteForm:FormGroup;
 

  constructor(
    private _notesServices:NotesServices,
    private _formBuilder:FormBuilder
  ) { 

    this.noteForm = this._formBuilder.group({
      'title':["",[]],
      'description':["",[]],
      'color':["",[]]
    });
  }

  ngOnInit(): void {
    this.faD = faTimes;
    this.faS = faCheck; 
  }
  createNote(form){
    var color;
    if(this.noteForm.get('color').value == null || this.noteForm.get('color').value == ""){
      color = "white";
    }
    else{
       color = this.noteForm.get('color').value;
    }
    this.newNote = new Note(
    null,
    window.localStorage['email'],
    this.noteForm.get('title').value,
    this.noteForm.get('description').value, 
    null,
    null, 
    color
    );
     this._notesServices.newNote(this.newNote).subscribe(
      respone=>{
        window.location.replace('notas');
      },
      error=>{
        alert(error.error.text);
      }
     );
  }

  dismissNote(){
    if(confirm('¿Deseas descartar la nota y volver al menu?')){
      window.location.replace('notas');
    }
    
  }

}
