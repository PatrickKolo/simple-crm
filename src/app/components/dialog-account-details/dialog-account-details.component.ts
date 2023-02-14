import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dialog-account-details',
  templateUrl: './dialog-account-details.component.html',
  styleUrls: ['./dialog-account-details.component.scss']
})
export class DialogAccountDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAccountDetailsComponent>,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
