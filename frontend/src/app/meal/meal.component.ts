import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  userStorage;
  token;
  meal = {
    id: '',
    text: '',
    calories: '',
    date: '',
    time: ''
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private usersService: UsersService) { }

  ngOnInit() {
    this.userStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = window.localStorage.getItem('token');
    this.activatedRoute.params.subscribe((params) => {
      this.meal.id = params['mealId'];
      this.usersService.getUserMealsById(this.userStorage.id, this.meal.id, this.token).subscribe((meal: any) => {
        this.meal = meal;
      }, err => {
        this.openSnackBar(err.error.error, 'Error');
        console.log(err);
      });
    });
  }
  onEditMeal() {
    this.usersService.updateUserMealsById(this.userStorage.id, this.meal, this.token).subscribe((res: any) => {
      this.openSnackBar('Meal updated!', 'Success');
      this.router.navigate(['home']);
    }, err => {
      console.log(err);
    });
  }
  onCancel() {
    this.router.navigate(['home']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
