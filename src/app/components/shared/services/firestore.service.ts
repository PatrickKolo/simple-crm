import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/models/customer.class';
import { User } from 'src/models/user.class';
import { AuthService } from './auth.service';



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


  constructor(
    private firestore: AngularFirestore,
    private injector: Injector,
  ) {
    this.getAllCustomers();
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
 * Deletes the user from the firestore based on the passed user id
 * @param uid The document id from the 'users' collection
 */
  deleteUser(uid: string) {

    this.firestore.collection('users')
      .doc(uid)
      .delete();

  }
}
