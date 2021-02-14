import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {email: "", password: ""};
  credentialsRegister = {email: "", password: ""};
  registerInfo;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.credentials)
    .then(() => this.router.navigate(['/travels']))
    .catch(error => console.log(error.message));
  }

  register(){
    this.authService.register(this.credentialsRegister)
    .then(() => this.registerInfo = "konto zostało utworzone")
    .then(() => this.router.navigate(['/travels']))
    .catch(error => console.log(error.message));
  }
}
