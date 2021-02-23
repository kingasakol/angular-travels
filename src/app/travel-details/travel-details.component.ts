import { Component, OnInit } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute } from '@angular/router';
import { Travel } from '../travel/travel';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';
import { Basket } from '../basket/basket';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent implements OnInit {

  starsNumber;
  stars = [1, 2, 3, 4, 5];
  rating = 1;
  hoverState = 0;

  travel: Travel;
  id;

  constructor(private authService: AuthService, private travelService: TravelService, private route: ActivatedRoute, private basketService: BasketService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTravel();
    }

  getTravel(){
    this.travelService.getTravelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe((travels: any) => {
      let travelsList = new Array();
      travelsList = travels;
        for(let i = 0; i < travelsList.length; i++){
          if(travelsList[i].key == this.id){
            this.travel = travelsList[i];
          }
        }
    });
  }

  addTravel(){
    let currentFreePlaces = this.travel.freePlaces - 1;
    if(currentFreePlaces >= 0){
      this.travelService.updateTravel(this.travel.key, {freePlaces: currentFreePlaces});

      let basketItem = new Basket();
      basketItem.email = this.authService.currentUser.userEmail;
      basketItem.travelUid = this.travel.key;
      this.basketService.createBasketItem(basketItem);
    }
  }

  removeTravel(){
    let currentFreePlaces = this.travel.freePlaces + 1;

    if(currentFreePlaces <= this.travel.maxPlaces){
      this.travelService.updateTravel(this.travel.key, {freePlaces: currentFreePlaces});

      this.basketService.deleteBasketItem(this.travel.key);
      }
  }

  updatePlaces(){
    const newPlaces = (<HTMLInputElement>document.getElementById("newPlaces")).value;
    this.travelService.updateTravel(this.travel.key, {maxPlaces: newPlaces});
  }

  updateQuantity(){
    const newQuantity = (<HTMLInputElement>document.getElementById("newQuantity")).value;
    this.travelService.updateTravel(this.travel.key, {quantity: newQuantity});
  }

  onStarEnter(starId: number){
    this.hoverState = starId;
  }

  onStarLeave(){
    this.hoverState = 0;
  }

  onStarClicked(starId: number){
    this.rating = starId;
    this.starsNumber = this.rating;

    if(starId != undefined){
      this.travelService.updateTravel(this.travel.key, {stars: starId});
    }
  }

  canUpdate(){
    if(this.authService.currentUser != undefined){
      if(this.authService.currentUser.roles.pracownik || this.authService.currentUser.roles.admin){
        return true;
      }
    }
    return false;
  }

}
