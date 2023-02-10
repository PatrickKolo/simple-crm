import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  loading = false;

  @ViewChild('signupForm') signupForm: any = NgForm;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  async signupUser() {
    this.loading = true;
    await this.authService.SignUp(this.signupForm.value.userName, this.signupForm.value.userEmail, this.signupForm.value.userPwd)
    this.loading = false;
  }

}