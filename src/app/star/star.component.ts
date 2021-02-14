import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input()
  starId;

  @Input()
  rating;

  @Input()
  travelId;

  @Input()
  starsNumber;

  @Output()
  startEnter: EventEmitter<number> = new EventEmitter();

  @Output()
  starLeave: EventEmitter<number> = new EventEmitter();

  @Output()
  starClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onStarEnter(){
    this.startEnter.emit(this.starId);
  }

  onStarLeave(){
    this.starLeave.emit();
  }

  onStarClicked(){
    this.starClicked.emit(this.starId);
  }

}
