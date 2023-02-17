import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DialogAccountDetailsComponent } from '../dialog-account-details/dialog-account-details.component';
import { DialogEditAccountComponent } from '../dialog-edit-account/dialog-edit-account.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.applyResponsiveNav();
  };

  mobileNav: boolean = false;

  constructor(public authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
      this.applyResponsiveNav();
      this.cdr.detectChanges();
    }

  ngOnInit(): void {
  }


   /**
   * Toggle the MatDrawer in Mobile View
   */
   toggleNav() {
    if (this.mobileNav) {
      this.drawer.toggle();
      this.drawer.mode = 'over';
    }
  }


    /**
   * Checks the window.innerheight and enables/disables the responsive view accordingly 
   */
    applyResponsiveNav() {
      if (window.innerWidth < 768) {
        this.drawer.close();
        this.mobileNav = true;
        this.drawer.mode = 'over';
      } else {
        this.drawer.open();
        this.mobileNav = false;
        this.drawer.mode = 'side';
      }
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
