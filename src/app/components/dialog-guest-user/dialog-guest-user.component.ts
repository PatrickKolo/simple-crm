import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";


@Component({
  selector: 'app-dialog-guest-user',
  templateUrl: './dialog-guest-user.component.html',
  styleUrls: ['./dialog-guest-user.component.scss']
})
export class DialogGuestUserComponent implements OnInit {
  hide = true;
  loading = false;

  @ViewChild('loginForm') loginform: any = NgForm;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
    async  loginGuest() {
      this.loading = true;
      await this.authService.guestLogin(this.loginform.value.userName)
      this.loading = false
    }
  
}
