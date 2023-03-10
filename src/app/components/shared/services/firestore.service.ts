import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/models/customer.class';
import { User } from 'src/models/user.class';
import { AuthService } from './auth.service';
import { Note } from 'src/models/notes.class';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  allUsers: any;
  userDataObject!: User;

  currentCustomersId: string = '';
  customerToAdd: Customer = new Customer();
  customerToEdit: Customer = new Customer();
  customers!: Array<any>;
  customersDataSource!: Observable<any>;
  currentCustomer: Customer = new Customer();

  allNotes: any;
  notesDataObject!: Note;
  currentNotesId: string = '';
  notesToAdd: Note = new Note();
  notesToEdit: Note = new Note();
  notes!: Array<any>;
  notesDataSource!: Observable<any>;
  currentNote: Note = new Note();


  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {
    this.getAllCustomers();
    this.getAllNotes();
    this.deleteOldGuestUsers(86400000); // Delete old guest users from firestore after 1 day
  }


  /**
 * CRUD => READ
 * 1. Gets the data from the customers collection
 * 2. Updates the local variable customers
 */
  getAllCustomers() {
    this.firestore
      .collection('customers')
      .valueChanges({ idField: 'customerId' })
      .subscribe((changes: any) => {
        this.customers = changes;
      });
  }


  /**
* Assigns an observable with the snapshot of all customers to the variable customersDataSource
* Needed for the MatTableDataSource
* The field "id" is only created for opening a customer in the table
*/
  getAllCustomersSnapshot() {
    this.customersDataSource = this.firestore.collection('customers').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  /**
 * Fetches the current customer from Firestore using the document id
 * @param documentId The unique document id from firestore
 */
  getCurrentCustomer(documentId: string) {
    this.firestore
      .collection('customers')
      .doc(documentId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.currentCustomer = new Customer(changes);
      });
  }


  /**
  * CRUD => DELETE
  * Deletes a customer from the Firestore
  * @param customerId The unique document id from firestore
  */
  deleteCustomer(customersId: string) {
    this.firestore
      .collection('customers')
      .doc(customersId.toString())
      .delete()
      .then(() => {
      });
  }


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


  /**
 * Deletes the user from the firestore based on the passed user id
 * @param uid The document id from the 'users' collection
 */
  deleteUser(uid: string) {
    this.firestore.collection('users')
      .doc(uid)
      .delete();
  }


  /**
   * Updates the current note in the firestore
     * @param nid The document id from the 'notes' collection
   */
  updateNotes(nid: string) {
    this.firestore
      .collection('notes')
      .doc(nid)
      .update(this.notesDataObject.NoteToJSON())
      .then(() => {
      });
  }


  /**
   * CRUD => READ
   * 1. Gets the data from the notes collection
   * 2. Updates the local variable notes
   */
  getAllNotes() {
    this.firestore
      .collection('notes')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.notes = changes;
      });
    console.log('currentNotesId', this.currentNotesId)
  }


  /**
  * Assigns an observable with the snapshot of all notes to the variable notesDataSource
  * Needed for the MatTableDataSource
  * The field "id" is only created for opening a notes in the table
  */
  getAllNotesSnapshot() {
    this.notesDataSource = this.firestore.collection('notes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Note;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  /**
   * Fetches the current note from Firestore using the document id
   * @param documentId The unique document id from firestore
   */
  getCurrentNote(documentId: string) {
    this.firestore
      .collection('notes')
      .doc(documentId)
      .valueChanges()
      .subscribe((changes: any) => {
        this.currentNote = new Note(changes);
      });
  }


  /**
   * Deletes the notes from the firestore based on the passed notes id
   * @param uid The document id from the 'notes' collection
   */
  deleteNotes(uid: string) {
    this.firestore.collection('notes')
      .doc(uid)
      .delete();
  }


  /**
   * Deletes old guest users from firestore
   * This deletes from FIRESTORE ONLY, not auth API
   * 1 month = 2629743833.3
   * 1 week = 604800000
   * 1 day (d) = 86400000
   * 1 hours (h) = 3600000
   * 1 minutes (m) = 60000
   * @param time time in milliseconds
   */
  deleteOldGuestUsers(time: number) {
    let timestampNow: number = Date.now();

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((user) => {
        user.forEach((element: any) => {
          if ((timestampNow - element['createdAt']) > time && element.isAnonymous) {
            this.deleteUser(element.uid);
          };
        })
      });
  }
}
