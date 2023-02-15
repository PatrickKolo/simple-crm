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
    this.getNotesIdFromURL();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      console.log('paramMap ', paramMap);
      this.notesId = paramMap.get('nId');
      console.log('notesId ', this.notesId);
      this.getNotes();
    })
  }


  getNotes() {
    this.firestore
      .collection('notes')
      .doc(this.notesId)
      .valueChanges()
      .subscribe((notes: any) => {
        this.notes = new Note(notes);
        console.log('retrieved note', this.notes)
      })
  }


  /**
* Fetches the notesId from the URL parameter and stores it in the variable notesId
*/
  getNotesIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('notesId is', this.notesId);
      this.notesId = paramMap.get('nId');
      this.firestoreService.getCurrentNote(this.notesId);
      this.firestoreService.currentNotesId = this.notesId;
    });
  }



  saveCustomer() {
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
