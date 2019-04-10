import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  // user: User = {
  //   id: 1,
  //   name: 'saba',
  //   email: 'saba.safavi75@gmail.com',
  //   username: 'saba-safavi'
  // };
  users: Array<User>;
  // userForm = new FormGroup({
  //   name:‌ new FormControl(''),
  //   email: new FormControl(''),
  //   username: new FormControl(''),
  // });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getUsers();
      this.userForm = this.formBuilder.group({
        name: [''],
        email: [''],
        username: ['']
      });

  }
  // it is not usable now
  // selectedUser: User
  // onSelect(user: User): void{
  //   this.selectedUser = user;
  // }

  getUsers(): void{
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

onSubmit(): void {
  // name = name.trim();
  // if (!name) { return; }
  this.userService.registerUser(this.userForm.value)
    .subscribe(user => {
      this.users.push(user);
    });
    this.userForm.reset();
  }
delete(user: User) {
  this.users = this.users.filter(h => h !== user);
  this.userService.removeUser(user.id);//.subscribe();
}
}
