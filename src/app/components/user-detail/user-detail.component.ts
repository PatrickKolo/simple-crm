import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/models/customer.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  customerId: any = '';
  customer: Customer = new Customer();


  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {


    this.route.paramMap.subscribe(paramMap => {
      this.customerId = paramMap.get('id');
      console.log('got Id ', this.customerId);
      this.getCustomer();
    })
  }


  getCustomer() {
    this.firestore
      .collection('customers')
      .doc(this.customerId)
      .valueChanges()
      .subscribe((customer: any) => {
        this.customer = new Customer(customer);
        console.log('retrieved customer', this.customer)
      })
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }


  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }
}



