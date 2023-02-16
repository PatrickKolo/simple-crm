import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/models/notes.class';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.scss']
})
export class DialogAddNoteComponent implements OnInit {

  note = new Note();
  date!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddNoteComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveNote() {
    this.note.date = this.date.getTime();
    console.log('Current note', this.note)
    this.loading = true;
    this.firestore
      .collection('notes')
      .add(this.note.NoteToJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding note finished', result)
        this.dialogRef.close();
      });
  }
}
