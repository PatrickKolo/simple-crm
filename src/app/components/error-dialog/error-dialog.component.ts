import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  public errorMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<ErrorDialogComponent>) {
    
    // this.errorMessage = data.toString().substring(25, 81);
    
    if(data.toString().includes('The email address is already in use by another account.')) {
      this.errorMessage = data.toString().substring(25, 81);
    } else if (data.toString().includes('There is no user record corresponding to this identifier.')) {
      this.errorMessage = 'There is no user found with this e-mail address.'
    } else if (data.toString().includes('The password is invalid or the user does not have a password.')) {
      this.errorMessage = 'The insert password is wrong. Please try it again'
    }
   }

  ngOnInit(): void {
  }

}
