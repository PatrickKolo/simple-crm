import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('forgotPasswordForm') forgotPasswordForm: any = NgForm;

  constructor(public authService: AuthService) { }
  public email = new FormControl('', [Validators.required, Validators.email]);
  loading = false;
  ngOnInit(): void {
  }

  async resetPassword() {
    this.loading = true;
    await this.authService.ForgotPassword(this.forgotPasswordForm.value.passwordResetEmail)
    this.loading = false;

  }
}