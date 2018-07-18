
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  name: string;
  newEmail: string;
  newPassword: string;
  newName: string;
  baseUrl = 'http://localhost:3000';
  hide = true;
  newCalories = 0;

  myControl: FormControl = new FormControl();
  constructor(
    private router: Router,
    private usersService: UsersService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  login() {
    console.log('login...');
    this.usersService.login({ email: this.email, password: this.password }).subscribe(({user, token}: any) => {
      console.log(user);
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home']);
    }, err => {
      this.openSnackBar(err.error.error, 'Error');
      console.log(err);
    });
  }
  signin() {
    console.log('signin...');
    const bodySave = {
      name: this.newName,
      email: this.newEmail,
      password: this.newPassword,
      caloriesPerDay: this.newCalories
    };
    this.usersService.signin(bodySave).subscribe(({user, token}: any) => {
      console.log(user);
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home']);
    }, err => {
      this.openSnackBar(err.error.error, 'Error');
      console.log(err);
    });

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
