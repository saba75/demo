import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {User} from '../user';
import { UserService }  from '../user.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  @Input() user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUserDetails();
  }
  getUserDetails(): void{
    // The route.snapshot is a static image of the route
    // information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values
    //  extracted from the URL. The "id" key returns the id of
    //  the hero to fetch.


    const id  = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
    .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

}
