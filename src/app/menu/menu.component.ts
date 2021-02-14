import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  authState;
  userEmail;

  userStatus = this.authService.userStatus;

  ngOnInit(): void {
    this.authService.authState$.forEach(e => {
      this.authState = e;
      if(e != null){
        this.userEmail = e.email;
      }
    });
  }

  logOut(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/startPage']);
    });
  }

  canAdd(){
    if(this.authService.currentUser != undefined){
      if(this.authService.currentUser.roles.pracownik || this.authService.currentUser.roles.admin){
        return true;
      }
      else{
        return false;
      }
    }
  }

  isAdmin(){
    if(this.authService.currentUser != undefined){
      if(this.authService.currentUser.roles.admin){
        return true;
      }
      else{
        return false;
      }
    }
  }
}
