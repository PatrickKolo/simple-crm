import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteCustomerComponent } from '../dialog-delete-customer/dialog-delete-customer.component';
import { FirestoreService } from 'src/app/components/shared/services/firestore.service'


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  customersId: any = '';
  customer: Customer = new Customer();


  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public firestoreService: FirestoreService) {
    this.getCustomerIdFromURL();
  }

  ngOnInit(): void {


    this.route.paramMap.subscribe(paramMap => {
      this.customersId = paramMap.get('id');
      console.log('got Id ', this.customersId);
      this.getCustomer();
    })
  }


  getCustomer() {
    this.firestore
      .collection('customers')
      .doc(this.customersId)
      .valueChanges()
      .subscribe((customer: any) => {
        this.customer = new Customer(customer);
        console.log('retrieved customer', this.customer)
      })
  }


  /**
   * Fetches the customerId from the URL parameter and stores it in the variable customerId
   */
  getCustomerIdFromURL() {
    this.route.paramMap.subscribe(paramMap => {
      this.customersId = paramMap.get('id');
      this.firestoreService.getCurrentCustomer(this.customersId);
      this.firestoreService.currentCustomersId = this.customersId;
    });
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customersId;
  }


  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customersId = this.customersId;
  }


  /**
    * Opens the customer delete dialog
    */
  openDeleteCustomerDialog() {
    this.dialog.open(DialogDeleteCustomerComponent);
  }
}



