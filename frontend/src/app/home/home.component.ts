import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Sort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  startTime;
  endTime;
  endDate;
  startDate;
  userStorage: any;
  token: string;
  user = {
    name: '',
    email: '',
    caloriesPerDay: 0,
    meals: []
  };
  newLunch = {
    text: '',
    calories: 0,
    time: 0,
    date: '',
    userId: ''
  };
  mealsGroupedByDate;
  mealDates;

  constructor(
    private router: Router,
    private usersService: UsersService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userStorage = JSON.parse(window.localStorage.getItem('user'));
    this.token = window.localStorage.getItem('token');
    if (!this.userStorage || !this.token) {
      this.router.navigate(['login']);
    }

    this.usersService.getUserById(this.userStorage.id, this.token).subscribe((user: any) => {
      console.log('user success');
      this.user = user;
      this.mealsGroupedByDate = this.groupByDate(this.user.meals);
      this.mealDates = Object.keys(this.mealsGroupedByDate).sort();
      console.log(this.mealDates);
    }, err => {
      this.router.navigate(['login']);
    });
  }

  onFilter() {
    let filters;
    filters = {};
    if (this.startDate) {
      filters.startDate = this.buildDateFilter(this.startDate);
    }
    if (this.endDate) {
      filters.endDate = this.buildDateFilter(this.endDate);
    }
    if (this.startTime || this.startTime === 0) {
      filters.startTime = this.startTime;
    }
    if (this.endTime || this.endTime === 0) {
      filters.endTime = this.endTime;
    }
    this.getUserMeals(this.userStorage.id, this.token, filters);
  }
  onEditUser() {
    this.router.navigate([`user/${this.userStorage.id}`]);
  }
  onAddMeal() {
    console.log(this.newLunch);
    this.newLunch.userId = this.userStorage.id;
    this.usersService.createMeal(this.newLunch, this.token).subscribe((res: any) => {
      this.getUserMeals(this.userStorage.id, this.token, {});
      this.openSnackBar('Meal added!', 'Success');
    }, err => {
      this.openSnackBar(err.error.error, 'Error');
    });
  }
  onDeleteMeal(mealId: string) {
    this.usersService.deleteMeal(this.userStorage.id, mealId, this.token).subscribe((res: any) => {
      this.getUserMeals(this.userStorage.id, this.token, {});
      this.openSnackBar('Meal deleted!', 'Success');
    }, err => {
      this.openSnackBar(err.error.error, 'Error');
    });
  }
  onEditMeal(mealId: string) {
    this.router.navigate([`meal/${mealId}`]);
  }

  getUserMeals(id: string, token: string, filter: any) {
    this.usersService.getUserMeals(this.userStorage.id, this.token, {}).subscribe((meals: any) => {
      this.mealsGroupedByDate = this.groupByDate(meals);
      this.mealDates = Object.keys(this.mealsGroupedByDate).sort();
      console.log(this.mealDates);
    }, err => {
      this.openSnackBar(err, 'Error');
    });
  }
  buildDateFilter(date: any) {
    if (!date) {
      return;
    }
    let result = '';
    result += date.getFullYear() + '-';
    if (date.getMonth() < 10) {
      result += '0';
    }
    result += (date.getMonth() + 1) + '-';
    if (date.getDate() < 10) {
      result += '0';
    }
    result += date.getDate();
    return result;
  }

  timeValidate(element) {
    if (element.value > 23) {
      element.value = 23;
    }
  }

  groupByDate(meals: any[]) {
    const grouped = {};
    for (const m of meals) {
      let { date } = m;
      date = date.split('T')[0];
      if (grouped[date]) {
        grouped[date].meals.push(m);
        grouped[date].totalCalories += m.calories;
      } else {
        grouped[date] = {
          meals: [m],
          totalCalories: m.calories
        };
      }
    }
    return grouped;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
