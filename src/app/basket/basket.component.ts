import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { BasketService } from '../services/basket.service';

import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  bookedTravelList;

  counterTravels;
  uniqTravelList;

  sum: number;

  choosedTravel;

  travelListFromServices;

  basketList = new Array();

  userEmail;
  authState;

  constructor(private travelService : TravelService, private basketService: BasketService, private authService: AuthService) { 

  }

  getTravelsList(){
    console.log("pobieram wycieczki");
    this.travelService.getTravelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe((travels: any) => {
      this.travelListFromServices = travels;

      this.uniqTravelList = new Array();
      this.counterTravels = new Array();

      this.getChoosedTravels();
      this.getUniqTravelList();
      this.getSum();
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
    );
  }

  ngOnInit(): void {
    this.authService.userChanges();
    this.bookedTravelList = new Array();
    this.uniqTravelList = new Array();
    this.counterTravels = new Array();
    
    this.authService.authState$.forEach(e => {
      this.authState = e;
      if(e != null){
        this.userEmail = e.email;
        this.getTravelsList();
        this.bookedTravelList = this.basketService.getBookedTravelList(this.userEmail);
      }
    });
   
  }

  getChoosedTravels(){
    this.uniqTravelList = new Array();
    this.counterTravels = new Array();
    if(this.travelListFromServices != undefined){
      this.counterTravels = new Array();
      for(var i = 0; i < this.travelListFromServices.length; i++){
        this.counterTravels.push(0);
        this.uniqTravelList.push(0);
      }
    }
  }

  getUniqTravelList(){
    for(var i = 0; i < this.bookedTravelList.length; i++){
      for(var j = 0; j < this.travelListFromServices.length; j++){
        if(this.bookedTravelList[i] == this.travelListFromServices[j].key){
          this.counterTravels[j]++;
        }
      }
    }

    for(var i = 0; i < this.travelListFromServices.length; i++){
      if(this.counterTravels[i] != 0 && this.uniqTravelList[i] == 0){
        this.uniqTravelList[i] = this.travelListFromServices[i];
      }
    }
  }

  getSum(){
    this.sum = 0;
    if(this.bookedTravelList != undefined){
      for(var i = 0; i < this.uniqTravelList.length; i++){
        if(this.uniqTravelList[i].quantity != undefined){
          this.sum += this.counterTravels[i] * this.uniqTravelList[i].quantity;
        }
      }
    }
  }

  getTravelPrice(uid: string){
    var travelsList = new Array();
    var price;

    this.travelService.getTravelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe((travels: any) => {
      travelsList = travels;
      travelsList.forEach(function (value){
        if(value.key == uid){
          price = value.quantity;
        }
      });
      return price;
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
    );
  }
}
