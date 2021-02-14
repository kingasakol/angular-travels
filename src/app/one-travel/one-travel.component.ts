import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Basket } from '../basket/basket';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';
import { TravelService } from '../services/travel.service';
import { User } from '../services/user.model';
import { Travel } from '../travel/travel';

@Component({
  selector: 'app-one-travel',
  templateUrl: './one-travel.component.html',
  styleUrls: ['./one-travel.component.css']
})
export class OneTravelComponent implements OnInit {

  @Input() t: Travel;


  @Output()
  travelToChange = new EventEmitter();

  constructor(private authService: AuthService, private travelService: TravelService, private basketService: BasketService) {
   
   }

  basketItem = new Basket();

  ngOnInit(): void {
    this.role = this.authService.currentUser;
    if(this.role != undefined){
      this.basketItem.email = this.role.email;
      this.basketItem.travelUid = this.t.key;
    }
  }

  travelFreePlaces;

  user: User;

  role;

  @Input()
  minPrices;
  
  @Input()
  maxPrices;

  addTravel(){
    let currentFreePlaces = this.t.freePlaces - 1;
    if(currentFreePlaces >= 0){
      this.travelService.updateTravel(this.t.key, {freePlaces: currentFreePlaces});
      this.basketService.createBasketItem(this.basketItem);
    }
  }

  removeTravel(){
    let currentFreePlaces = this.t.freePlaces + 1;
    if(currentFreePlaces <= this.t.maxPlaces){
      this.travelService.updateTravel(this.t.key, {freePlaces: currentFreePlaces});
      this.basketService.deleteBasketItem(this.t.key);
    }
  }
  
  deleteTravel(){
    this.travelService.deleteTravel(this.t.key);
  }

  updateStars(starId){
    this.travelService.updateTravel(this.travelFreePlaces.key, {starsNumber: starId});
  }

  actualTravel(){
   const tempDate = new Date(this.t.startTime).getTime();
   return tempDate - new Date().getTime() > 0;
  }

  canSeeReader(): boolean{
    if(this.role != undefined){
      if(this.role.roles.reader && !this.role.roles.VIP)
       if(this.t.freePlaces != 0 && this.actualTravel()){
        return true;
      }
      if(this.role.roles.pracownik){
        return true;
      }
      if(this.role.roles.VIP){
        return true;
      }
    }
    if(this.role == null){
      return true;
    }
  }

  canDelete(){
    if(this.role != undefined){
      if((this.role.roles.pracownik || this.role.roles.VIP || this.role.roles.reader) && !this.role.roles.admin){
        return false;
      }
    }
    return true;
  }

  canSeeVip(){
    if(this.role != undefined){
      if(this.role.roles.VIP && !this.role.roles.admin){
        if(!this.actualTravel()){
          return true;
        }
      } else {
        return false;
      }
    }
  }
}
