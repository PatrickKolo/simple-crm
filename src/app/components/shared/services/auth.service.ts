import { Injectable, NgZone, Injector } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/components/dialog-add-customer/dialog-add-user.component';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { FirestoreService } from './firestore.service';
import { DialogLoggedInComponent } from '../../dialog-logged-in/dialog-logged-in.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  loginAsGuest: boolean = false;
  authProcessing: boolean = false;
  newDisplayName: string = '';


  constructor(
    public dialog: MatDialog,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private firestoreService: FirestoreService,
  ) {


    /**
     *Saving user data in localstorage when logged in and setting up null when logged out
     *  
     */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


   /**
   * Checks if the user is already logged in
   * Displays a forwarding dialog after a short delay if the user is logged in
   */
   checkAlreadyLoggedIn() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified && !user.isAnonymous && !this.authProcessing) {
        setTimeout(() => {
          this.openAlreadyLoggedInDialog();
        }, 1000);
      }
    });
  }


  /**
   * Opens the already logged in dialog
   */
  openAlreadyLoggedInDialog() {
    this.dialog.open(DialogLoggedInComponent);
  }


  /**
   * Sign in with email/password
   * @param email 
   * @param password 
   * @returns 
   */
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['main/dashboard']);
          }
        });
      })
      .catch((error) => {
        this.dialog.open(ErrorDialogComponent, { data: error })
      });

  }


  /**
   * Sign up with email/password and call the SendVerificaitonMail() function when new user sign up and returns promise
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  SignUp(displayName: string, email: string, password: string) {

    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.changeDisplayName(displayName);
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.dialog.open(ErrorDialogComponent, { data: error })
      });
  }


  /**
   * Send email verfificaiton when new user sign up
   * 
   */
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['veryfy-email']);
      });
  }


  /**
   * Reset Forggot password
   * 
   * @param passwordResetEmail 
   * @returns 
   */
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        this.dialog.open(ErrorDialogComponent, { data: error })
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) && (this.checkEmailVerification() !== false) ? true : false;
  }

  
  /**
     * Checks if the user is a guest, if yes no email verification is needed
     * @returns true || false
     */
  checkEmailVerification() {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (this.loginAsGuest) {
      return true;
    } else if (user.emailVerified) {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Sign in with Google
   * 
   * @returns 
   */
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then(() => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['main/dashboard']);
        }
      })
    });
  }


  /**
   * Auth logic to run auth providers
   *  
   */
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['main/dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

 


  /**
   * Setting up user data when sign in with username/password,sign up with username/password and sign in with social authprovider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   * 
   * @param user 
   * @returns 
   */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  /**
   * Creates an anonymous user account in Firebase Authentication and logs in the user
   * @param guestDisplayName The name of the guest user
   */
  guestLogin(guestDisplayName: string) {
    this.loginAsGuest = true;
    this.afAuth.signInAnonymously().then((result) => {
      this.SetUserData(result.user);
      this.changeDisplayName(guestDisplayName);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['main/dashboard']);
        }
      })
    }).catch(error => console.error(error))
  }


  /**
   * Sign out
   * 
   * @returns 
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      // this.isLoggedIn = false
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }


  /**
   * Changes the displayName of the currently logged in user
   * @param newName String with the new name
   */
  changeDisplayName(newName: string) {
    this.afAuth.currentUser.then((user) => {
      user!.updateProfile({
        displayName: newName
      }).then(() => {
        this.firestoreService.updateUser(user!.uid);
      })
    })
  }


  /**
    * Deletes the currently logged in user
    */
  deleteUser() {
    this.authProcessing = true;

    this.afAuth.currentUser.then((user) => {
      this.firestoreService.deleteUser(user!.uid); // Delete the user from firestore
      user!.delete().then(() => {
        this.authProcessing = false;

        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }).catch((error) => { });
    }).catch((error) => { });
  }
}
