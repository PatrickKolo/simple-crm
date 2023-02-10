import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  allUsers: any;
  userDataObject!: User;

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {}

  /**
   * Updates the current user in the firestore
   * Possible changes: displayName || photoURL
   * @param uid The document id from the 'users' collection
   */
  updateUser(uid: string) {
    
    const authService = this.injector.get(AuthService);
    this.userDataObject = new User(authService.userData); // Convert observable into object

    this.firestore
      .collection('users')
      .doc(uid)
      .update(this.userDataObject.UserToJSON())
      .then(() => {
      });
  }
}
