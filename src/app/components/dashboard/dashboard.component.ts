import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { FirestoreService } from 'src/app/components/shared/services/firestore.service';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserComponent } from '../customer/user.component';
import { Customer } from 'src/models/customer.class';
import { Note } from 'src/models/notes.class';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  customer = new Customer();
  allCustomers = [];

  notes = new Note();
  allNotes = [];

  title = 'clock-greets';
  time: any;
  hours: any;
  msg: any;
  link: any;

  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.decide();
  }

  ngOnInit(): void {
    this.firestore
    .collection('customers')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes:any) =>{
      //console.log('allCustomers', this.allCustomers);
      this.allCustomers = changes;
    });


    this.firestore
    .collection('notes')
    .valueChanges({idField: 'customIdName'})
    .subscribe((changes:any) =>{
      //console.log('allCustomers', this.allCustomers);
      this.allNotes = changes;
    });
  }


/**
 * shows the greeting text depending on the time
 * 
 */
  decide() {
    this.hours = new Date().getHours();
    if (this.hours < 10) {
      this.msg = "Good Morning"
    } else if (this.hours < 16) {
      this.msg = "Good Day"
    } else if (this.hours < 19) {
      this.msg = "Good Evening"
    } else if (this.hours < 24) {
      this.msg = "Good Night"
    } else if (this.hours < 6) {
      this.msg = "Good Night"
    }
  }
  firebaseSusbscribing() {
  }


  openNotes(){
    this.router.navigateByUrl('main/notes');
  }

  openCustomers(){
    this.router.navigateByUrl('main/user');
  }
}