import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TravelService } from '../services/travel.service';

import { map } from 'rxjs/operators';

import { Travel } from './travel';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  @Input() travel: Travel;

  travelsList;
  
  travelFreePlaces;

  bookedTraveList;
  pricesTravelList;

  minPrices;
  maxPrices;

  sumOfBookedTravel = 0;

  userEmail;
  authState;
  user: User;

  role;

  @Output()
  data = new EventEmitter();

  constructor(private authService: AuthService, private travelService: TravelService, private basketService: BasketService) { 
  }

  userStatus = this.authService.userStatus;

  bookedTravelCounted = false;

   getTravelsList(){
    this.travelService.getTravelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe((travels: any) => {
      this.travelsList = travels;

      if(this.userEmail != undefined){
        this.sumOfBookedTravel = 0;
        this.bookedTraveList = new Array();
        this.getSumOfBookedTravel();
        this.bookedTravelCounted = !this.bookedTravelCounted;
      }
     
      this.getMaxMinPrices();
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
    );

    this.authService.authState$.forEach(e => {
      this.authState = e;
      if(e != null && !this.bookedTravelCounted){
        this.userEmail = e.email;
      }
    });
   }

  ngOnInit(): void {
    this.bookedTraveList = new Array();
    this.sumOfBookedTravel = 0;

    this.authService.userChanges();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    this.role = this.authService.currentUser;
    this.getTravelsList();
    this.getMaxMinPrices();
  }

  getSumOfBookedTravel(){
    this.bookedTraveList = new Array();
    this.sumOfBookedTravel = 0;

      this.basketService.getBasketList().ref.where("email", "==", this.userEmail).onSnapshot(snap => {
        snap.forEach(basketRef => {
          this.bookedTraveList.push(basketRef.data().travelUid);
          this.sumOfBookedTravel += 1;
        })
      })
  }

  getMaxMinPrices(){
    if(this.travelsList != undefined){
      var min = this.travelsList[0].quantity;
      var max = this.travelsList[0].quantity;
  
      for(var i = 1; i < this.travelsList.length; i++){
        if(max > this.travelsList[i].quantity){
          max = this.travelsList[i].quantity;
        }
        if(min < this.travelsList[i].quantity){
          min = this.travelsList[i].quantity;
        }
      }
      this.maxPrices = max;
      this.minPrices = min;
    }
  }
}
