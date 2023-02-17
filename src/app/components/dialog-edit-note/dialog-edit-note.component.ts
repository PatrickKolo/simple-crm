import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/models/notes.class';
import { FirestoreService } from '../shared/services/firestore.service';
import { DialogDeleteNoteComponent } from 'src/app/components/dialog-delete-note/dialog-delete-note.component';
import { Router } from '@angular/router';


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
  date!: Date;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditNoteComponent>, 
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public router: Router,
    public firestoreService: FirestoreService) {
    this.getNotesIdFromURL();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.notesId = paramMap.get('nId');
      console.log('got Id ', this.notesId);
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
        console.log('retrieved customer', this.notes)
      })
  }


  /**
   * Fetches the customerId from the URL parameter and stores it in the variable customerId
   */
  getNotesIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      this.notesId = paramMap.get('nId');
      this.firestoreService.getCurrentNote(this.notesId);
      this.firestoreService.currentNotesId = this.notesId;
    });
  }


  saveNote() {
    this.loading = true;
    this.firestore
      .collection('notes')
      .doc(this.notesId)
      .update(this.notes.NoteToJSON())
      .then(() => {
        this.loading = false;
        this.router.navigate(['notes']);
      })
  }

 
  /**
    * Opens the customer delete dialog
    */
  openDeleteNoteDialog() {
    this.dialog.open(DialogDeleteNoteComponent);
  }
}

