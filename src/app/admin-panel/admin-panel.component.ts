import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  sessionOption;
  confirmInfo;


  constructor(private authService: AuthService, private router: Router) {
  }
  
  ngOnInit(): void {
    if(this.authService.currentUser == undefined || this.authService.currentUser == null){
      this.router.navigate(['/login']);
    }
  }

  changeOption(option){
   this.authService.changePersistence(option);
    this.confirmInfo = "Zmieniłeś opcje na: " + option;
  }

}
