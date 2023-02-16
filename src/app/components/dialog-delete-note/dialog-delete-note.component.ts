import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/components/shared/services/firestore.service'

@Component({
  selector: 'app-dialog-delete-note',
  templateUrl: './dialog-delete-note.component.html',
  styleUrls: ['./dialog-delete-note.component.scss']
})
export class DialogDeleteNoteComponent implements OnInit {
  notesId: string = this.firestoreService.currentNotesId;

  constructor(public dialogRef: MatDialogRef<DialogDeleteNoteComponent>, public firestoreService: FirestoreService, private router: Router) { }

  ngOnInit(): void {
  }
  deleteNote() {
    this.firestoreService.deleteNotes(this.notesId);
    console.log('notesID', this.notesId)

    setTimeout(() => {
      this.redirect();
    }, 500);
  }

  /**
   * Redirects to the customers page when a customer is deleted
   */
  redirect() {
    this.dialogRef.close();
    this.router.navigateByUrl('notes');
  }

}
