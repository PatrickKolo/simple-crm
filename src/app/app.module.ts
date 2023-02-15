import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { DialogEditAddressComponent } from './components/dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogGuestUserComponent } from './components/dialog-guest-user/dialog-guest-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DialogDeleteCustomerComponent } from './components/dialog-delete-customer/dialog-delete-customer.component';
import { DialogAccountDetailsComponent } from './components/dialog-account-details/dialog-account-details.component';
import { DialogEditAccountComponent } from './components/dialog-edit-account/dialog-edit-account.component';
import { DialogDeleteAccountComponent } from './components/dialog-delete-account/dialog-delete-account.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { NotesComponent } from './components/notes/notes.component';
import { DialogAddNoteComponent } from './components/dialog-add-note/dialog-add-note.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogEditNoteComponent } from './components/dialog-edit-note/dialog-edit-note.component';
import { DialogDeleteNoteComponent } from './components/dialog-delete-note/dialog-delete-note.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    ErrorDialogComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SignInComponent,
    VerifyEmailComponent,
    DialogGuestUserComponent,
    DialogDeleteCustomerComponent,
    DialogAccountDetailsComponent,
    DialogEditAccountComponent,
    DialogDeleteAccountComponent,
    ImprintComponent,
    NotesComponent,
    DialogAddNoteComponent,
    DialogEditNoteComponent,
    DialogDeleteNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angulr Material - START 
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    // Angular Material - END
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,

  ],
  providers: [
    { provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }