import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>,  private firestore: AngularFirestore) { }
  customer = new Customer();
  loading = false;
  birthDate!: Date;
  customerId: any;

  ngOnInit(): void {
  }

  saveCustomer(){
    this.loading = true;
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