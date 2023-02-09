import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {}

  
}
