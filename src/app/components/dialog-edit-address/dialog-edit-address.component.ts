import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';
import { DialogAddUserComponent } from '../dialog-add-customer/dialog-add-user.component';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  customer: Customer = new Customer();
  customerId: any;
  loading = false;
  

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveCustomer(){
    this.firestore
    .collection('customers')
    .doc(this.customerId)
    .update(this.customer.toJSON())
    .then(() =>{
      this.loading = false;
      this.dialogRef.close()
        })
  }

}