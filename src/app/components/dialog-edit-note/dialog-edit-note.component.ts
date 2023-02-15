import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/models/notes.class';
import { FirestoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-note',
  templateUrl: './dialog-edit-note.component.html',
  styleUrls: ['./dialog-edit-note.component.scss']
})
export class DialogEditNoteComponent implements OnInit {
  loading = false;
  notes = new Note();
  allNotes = [];
  notesId: any = '';

  constructor(public dialogRef: MatDialogRef<DialogEditNoteComponent>, 
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public firestoreService: FirestoreService) {
    
  }


  ngOnInit(): void {
   
  }



  saveNote() {
    this.loading = true;
    this.firestore
      .collection('notes')
      .doc(this.notesId)
      .update(this.notes.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close()
      })
  }
}
