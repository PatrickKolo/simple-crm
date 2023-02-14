import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/components/shared/services/firestore.service';
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dialog-edit-account',
  templateUrl: './dialog-edit-account.component.html',
  styleUrls: ['./dialog-edit-account.component.scss']
})
export class DialogEditAccountComponent implements OnInit {

  editUserForm!: FormGroup;

  constructor(    public dialogRef: MatDialogRef<DialogEditAccountComponent>,
    public authService: AuthService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      newDisplayName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * Submits a form
   */
  onSubmit() {
    if (this.editUserForm.valid) {
      this.authService.changeDisplayName(this.editUserForm.value.newDisplayName);
      this.dialogRef.close();
    }
  }

  /**
   * Opens a dialog to confirm the deletion of the user
   */
  openDeleteUserDialog() {
    this.dialog.open(DialogDeleteAccountComponent);
  }

}


