import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTravelComponent } from './one-travel.component';

describe('OneTravelComponent', () => {
  let component: OneTravelComponent;
  let fixture: ComponentFixture<OneTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
