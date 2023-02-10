import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  customer = new Customer();
  allCustomers = [];


  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection('customers')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes:any) =>{
      console.log('Received changes from DB', changes);
      this.allCustomers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);

  }

}
