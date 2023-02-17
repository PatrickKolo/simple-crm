import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './components/shared/guard/auth.guard';
import { DialogGuestUserComponent } from './components/dialog-guest-user/dialog-guest-user.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { NotesComponent } from './components/notes/notes.component';
import { DialogEditNoteComponent } from './components/dialog-edit-note/dialog-edit-note.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  // {path: 'user', component: UserComponent, canActivate:[AuthGuard]},
  // {path: 'customer/:id', component: UserDetailComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'veryfy-email', component: VerifyEmailComponent },
  { path: 'dialog-guest', component: DialogGuestUserComponent },

  {
    path: 'main',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'customer/:id', component: UserDetailComponent },
      { path: 'imprint', component: ImprintComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'notes/:nId', component: DialogEditNoteComponent },
    ],
    component: MainComponent, canActivate: [AuthGuard]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }