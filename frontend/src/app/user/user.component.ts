import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  userStorage;
  token;
  user = {
    id: '',
    name: '',
    email: '',
    caloriesPerDay: ''
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
      this.user.id = params['userId'];
      this.usersService.getUserById(this.userStorage.id, this.token).subscribe((user: any) => {
        this.user = user;
      }, err => {
        this.openSnackBar(err.error.error, 'Error');
        console.log(err);
      });
    });
  }
  onEditUser() {
    this.usersService.update(this.userStorage.id, this.user, this.token).subscribe((res: any) => {
      this.openSnackBar('User updated!', 'Success');
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
