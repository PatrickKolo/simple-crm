import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  customer = new Customer();
  birthDate!: Date;
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveCustomer() {
    this.customer.birthDate = this.birthDate.getTime();
    console.log('Current Customer', this.customer)
    this.loading = true;


    this.firestore
      .collection('customers')
      .add(this.customer.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding customer finished', result)
        this.dialogRef.close();
      });

  }

}