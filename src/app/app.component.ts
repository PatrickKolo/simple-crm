import { Component } from '@angular/core';
import { DialogAccountDetailsComponent } from './components/dialog-account-details/dialog-account-details.component';
import { DialogEditAccountComponent } from './components/dialog-edit-account/dialog-edit-account.component';
import { AuthService } from "./components/shared/services/auth.service";
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})


export class AppComponent {


  constructor(public authService: AuthService,
    private dialog: MatDialog,
    ) {
    
  }



  /**
   * Opens the user details dialog
   */
  openUserDetailsDialog() {
    this.dialog.open(DialogAccountDetailsComponent);
  }

  /**
   * Opens a dialog to edit the user
   */
  openEditUserDialog() {
    this.dialog.open(DialogEditAccountComponent);
  }

  
}