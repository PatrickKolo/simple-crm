import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';
import { FirestoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-dialog-logged-in',
  templateUrl: './dialog-logged-in.component.html',
  styleUrls: ['./dialog-logged-in.component.scss']
})
export class DialogLoggedInComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLoggedInComponent>,
    public authService: AuthService,
    public firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
  }

}
