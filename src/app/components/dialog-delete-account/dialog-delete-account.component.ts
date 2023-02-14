import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dialog-delete-account',
  templateUrl: './dialog-delete-account.component.html',
  styleUrls: ['./dialog-delete-account.component.scss']
})
export class DialogDeleteAccountComponent implements OnInit {

  constructor(public authService: AuthService,
    public dialogRef: MatDialogRef<DialogDeleteAccountComponent>) { }

  ngOnInit(): void {
  }

}
