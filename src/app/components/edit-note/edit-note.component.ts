import { Component, OnInit } from '@angular/core';
import { NotesServices} from '../../services/note.service';
import { Note } from '../../models/note';
import {FormGroup, FormBuilder} from '@angular/forms';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
  providers: [NotesServices]
})
export class EditNoteComponent implements OnInit {
  faR;
  faG;
  public editNote:Note;
  noteForm:FormGroup;
public id:String;
public pdate: Date;

  constructor(
    private _notesServices:NotesServices,
    private _route:ActivatedRoute,
    private _formBuilder:FormBuilder
  ) { 
    this.noteForm = this._formBuilder.group({
      'title':[ ,[]],
      'description':["",[]],
      'color':["",[]]
    });
  }

  ngOnInit(): void {
    this.faR = faTimes;
    this.faG = faCheck; 

    this._route.params.subscribe(params=>{
       this.id = params.id;
      this.getData(this.id);
    });
    this.pdate = new Date();
  }

//get data of note
  getData(id){
    this._notesServices.detailNote(id).subscribe(
      response=>{
        this.editNote = response.note;
        this.editNote.date = new Date(this.editNote.date);
          this.editNote.data = this.editNote.date.toDateString();
          //this.pdate = this.editNote.date;
          this.editNote._id = this.id;
          this.noteForm.get('title').setValue(this.editNote.title);
          this.noteForm.get('color').setValue(this.editNote.color);
          this.noteForm.get('description').setValue(this.editNote.description);
      },
      error=>{
        window.location.replace('notas');
      }
    );
  }

  //Update
  updateData(){
    this.editNote = new Note(
      this.id,
      window.localStorage['email'],
      this.noteForm.get('title').value,
      this.noteForm.get('description').value, 
      this.pdate,
      null, 
      this.noteForm.get('color').value
      );
      
    this._notesServices.editNote(this.editNote, this.id).subscribe(
      response=>{
        alert("La nota fue guardada correctamente");
        window.location.replace('notas');
      },
      error=>{
        alert(error.error.text);
        window.location.replace('notas');
      }
    );
  }


  //Return menu
  dismissNote(){
    if(confirm('¿Deseas descartar la nota y volver al menu?')){
      window.location.replace('notas');
    }
  }

  
}

