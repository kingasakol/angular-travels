import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TravelService } from '../services/travel.service';
import { Travel } from '../travel/travel';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent implements OnInit {

  addedTravel: Travel = new Travel();

  isNameError = false;
  isDescriptionError = false;
  isStartTimeError = false;
  isEndTimeError = false;
  isMaxPlacesError = false;
  isQuantityError = false;
  isCountryError = false;
  isLinkError = false;
  isDataIntervalError = false;


    userForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    maxPlaces: new FormControl(),
    quantity: new FormControl(),
    country: new FormControl(),
    link: new FormControl(),
  });

  onSubmit(){
    if(this.safeData(this.addedTravel)){
      this.save();
      this.userForm.reset();
    }
  }

  constructor(private travelService: TravelService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.currentUser == undefined || this.authService.currentUser == null){
      this.router.navigate(['/login']);
    }
  }

  newTravel(): void{
      this.addedTravel = new Travel();
  }

  save(){
    this.addedTravel.freePlaces = this.addedTravel.maxPlaces;
    this.addedTravel.stars = 0;
    this.travelService.createTravel(this.addedTravel);
    this.addedTravel = new Travel();
  }

  safeData(data): boolean{
    var tempStartDate = new Date(data.startTime);
    var tempEndDate = new Date(data.endTime);
    if(data.name == null){
      this.isNameError = true;
      return false;
    } else {
      this.isNameError = false;
    }

    if(data.description == null){
      this.isDescriptionError = true;
      return false;
    } else {
      this.isDescriptionError = false;
    }

    if(data.startTime == null){
      this.isStartTimeError = true;
      return false;
    } else {
      this.isStartTimeError = false;
    }

    if(data.endTime == null){
      this.isEndTimeError = true;
      return false;
    } else {
      this.isEndTimeError = false;
    }

    if(data.startTime > data.endTime){
      this.isDataIntervalError = true;
      return false;
    } else {
      this.isDataIntervalError = false;
    }

    if(new Date() > tempStartDate){
      this.isDataIntervalError = true;
      return false;
    } else {
      this.isDataIntervalError = false;
    }
    
    if(data.startTime > data.endTime){
      this.isDataIntervalError = true;
      return false;
    } else {
      this.isDataIntervalError = false;
    }

    if(data.maxPlaces == null){
      this.isMaxPlacesError = true;
      return false;
    } else {
      this.isMaxPlacesError = false;
    }

    if(data.quantity == null){
      this.isQuantityError = true;
      return false;
    } else {
      this.isQuantityError = false;
    }

    if(data.country == null){
      this.isCountryError = true;
      return false;
    } else {
      this.isCountryError = false;
    }

    if(data.link == null){
      this.isLinkError = true;
      return false;
    } else {
      this.isLinkError = false;
    }

    return true;
  }

}
