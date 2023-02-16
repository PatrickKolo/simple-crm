import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/components/shared/services/firestore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  customer = new Customer();
  allCustomers = [];

  dataSource!: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  noData: boolean = false;


  constructor(public dialog: MatDialog, 
    private firestore: AngularFirestore,
    public firestoreService: FirestoreService,
    private router: Router) { }


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateTableData();

    this.firestore
      .collection('customers')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        // console.log('Received changes from DB', changes);
        this.allCustomers = changes;
      });
  }


  /**
   * Subscribes the observable from the firestore and assigns each change to the variable dataSource
   */
  updateTableData() {
    this.firestoreService.getAllCustomersSnapshot();

    this.firestoreService.customersDataSource.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.displayNoDataMessage();
    });

  }

  /**
   * Shows the user a message when no data is available
   */
  displayNoDataMessage() {
    if (this.dataSource['_data']['_value'].length < 1) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }


  /**
  * Filters the dataSource from the table
  * @param event 
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Redirects to customer/customerId
   * @param customerId The unique firebase document id
   */
  openCustomerDetails(customerId: string) {
    this.router.navigateByUrl('/customer/' + customerId);
  }


  /**
   * opens die Dialog for adding a new customer
   */
  openAddCustomerDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
