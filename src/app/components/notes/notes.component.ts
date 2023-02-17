import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddNoteComponent } from '../dialog-add-note/dialog-add-note.component';
import { Note } from 'src/models/notes.class';
import { DialogDeleteNoteComponent } from '../dialog-delete-note/dialog-delete-note.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogEditNoteComponent } from '../dialog-edit-note/dialog-edit-note.component';
import { FirestoreService } from 'src/app/components/shared/services/firestore.service'
import { UtilsService } from 'src/app/components/shared/services/utils.service'


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

  notesId: any = '';
  notes: Note = new Note();

  constructor(public dialog: MatDialog,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public utils: UtilsService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.notesId = paramMap.get('id');
      //  console.log('notesId ', this.notesId);
      this.getNotes();
    })
  }


  getNotes() {
    this.firestore
      .collection('notes')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('allNotes', changes);
        this.allNotes = changes;
      });
  }


 


  // editMenu(notesId: string) {
  //   notesId = this.notesId
  //   const dialog = this.dialog.open(DialogEditNoteComponent)
  //   dialog.componentInstance.notes = new Note(this.notes.NoteToJSON());
  //   dialog.componentInstance.notesId = this.notesId;
  // }

    /**
   * Redirects to customer/customerId
   * @param customerId The unique firebase document id
   */
    editMenu(notesId: string) {
      this.router.navigateByUrl('main/notes/' + notesId);
    }


  // editNotesDetail() {
  //   const dialog = this.dialog.open(DialogEditNoteComponent)
  //   dialog.componentInstance.notes = new Note(this.note.NoteToJSON());
  //   dialog.componentInstance.notesId = this.notesId;
  // }


  /**
   * opens die Dialog for adding a new note
   */
  openDialogAddNote() {
    this.dialog.open(DialogAddNoteComponent);
  }


  /**
  * Opens the notes delete dialog
  */
  openDeleteNoteDialog() {
    this.dialog.open(DialogDeleteNoteComponent);
  }
}

