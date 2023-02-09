import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { FirestoreService } from 'src/app/components/shared/services/firestore.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;

  constructor(
    public authService: AuthService,
    public firestoreService: FirestoreService
  ) { 

    setInterval(() => {
      this.time = new Date();
   }, 1000);

   this.decide();
  }

  ngOnInit(): void {
   
  }

  
  decide() {
    this.hours = new Date().getHours();
    console.log("this.hours",this.hours)
    if(this.hours < 10){
      this.msg = "Good Morning"
    }else if(this.hours < 16){
      this.msg = "Good Afternoon"
    }else if(this.hours < 19){
      this.msg = "Good Evening"
    }else if(this.hours < 24){
      this.msg = "Good Night"
    }else if(this.hours < 6){
      this.msg = "Sleep lah"
    }
  }
  firebaseSusbscribing(){
  } 
}