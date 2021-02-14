import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { BasketService } from '../services/basket.service';

import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private travelService : TravelService, private basketService: BasketService, private router: Router ) { 

  }

   getTravelsList(){
    this.travelService.getTravelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe((travels: any) => {
      this.travelListFromServices = travels;
      this.bookedTravelList = new Array();
      this.basketList = new Array();
      this.getBookedTravels();
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
    );
    }

  ngOnInit(): void {
    this.bookedTravelList = new Array();
    this.getTravelsList();
  }

  getBookedTravels(){
    this.bookedTravelList = new Array();
    if(this.travelListFromServices != undefined){
      for(let i = 0; i < this.travelListFromServices.length; i++){
        
        if(this.travelListFromServices[i].maxPlaces - this.travelListFromServices[i].freePlaces > 0){
          if(this.travelListFromServices[i].maxPlaces - this.travelListFromServices[i].freePlaces > 0){
            for(let j = 0; j < this.travelListFromServices[i].maxPlaces - this.travelListFromServices[i].freePlaces; j++){
              this.bookedTravelList.push(this.travelListFromServices[i]);
            }
          }
        }
      }
    }

    this.getChoosedTravels();
    this.getUniqTravelList();
    this.getSum();
  }

  getChoosedTravels(){
    this.uniqTravelList = new Array();
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
        if(this.bookedTravelList[i].name == this.travelListFromServices[j].name){
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
}
