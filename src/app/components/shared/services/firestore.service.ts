import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // customerToAdd: User = new User();

  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {}

  
}
