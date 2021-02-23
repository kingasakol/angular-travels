import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  sessionOption;
  confirmInfo;
  usersList;

  constructor(private authService: AuthService, private router: Router, private usersService: UsersService) {
  }
  
  ngOnInit(): void {
    if(this.authService.currentUser == undefined || this.authService.currentUser == null){
      this.router.navigate(['/login']);
    }
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsersList().snapshotChanges().pipe(map(changes => changes.map(c => ({key : c.payload.doc.id, ... c.payload.doc.data()})))).subscribe((users : any) => {
      this.usersList = users;
      console.log(this.usersList[0].key + "klucz");
    });
  }

  changeOption(option){
    this.authService.changePersistence(option);
    this.confirmInfo = "Zmieniłeś opcje na: " + option;
  }

  changeRole(key: string, role: string){
    var roles;
    roles = this.getRoles(key);
    console.log(roles);

    switch(role){
      case "VIP": {
        roles.VIP = !roles.VIP;
        break;
      }
      case "pracownik": {
        roles.pracownik = !roles.pracownik;
        break;
      }
      case "reader": {
        roles.reader = !roles.reader;
        break;
      }
      case "admin": {
        roles.admin = !roles.admin;
        break;
      }
      default: {
        console.log("error - niepoprawna rola uzytkownika");
        break;
      }
    }
    
    this.usersService.updateRole(key, {roles: roles});
  }

  private getRoles(key: string){
    var roles;
    for(var i = 0; i < this.usersList.length; i++){
      console.log(this.usersList[i].key + " " + key);
      if(this.usersList[i].key === key){
        roles = this.usersList[i].roles;
        break;
      }
    }
    return roles;
  }

}
