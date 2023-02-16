import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../shared/services/firestore.service';
import { Note } from 'src/models/notes.class';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  notesId: any = '';
  notes: Note = new Note();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public firestoreService: FirestoreService
  ) { 
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


  openDeleteNoteDialog(){

  }

  editNoteDetail(){

  }
}
