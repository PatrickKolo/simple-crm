import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddNoteComponent } from '../dialog-add-note/dialog-add-note.component';
import { Note } from 'src/models/notes.class';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  note = new Note();
  allNotes = [];
  panelOpenState = false;
  date: number = this.note.date;

  constructor(public dialog: MatDialog,  private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection('notes')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes:any) =>{
     // console.log('Received changes from DB', changes);
      this.allNotes = changes;
    });
  }


  /**
   * opens die Dialog for adding a new customer
   */
  openDialogAddNote() {
    this.dialog.open(DialogAddNoteComponent);
  }


  editNote(){}

  openDeleteNoteDialog(){}
}
