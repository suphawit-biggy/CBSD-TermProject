import { Component, OnInit } from '@angular/core';
import {UsersDataService} from '../../service/users-data.service';
import {Router} from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  search:string;
  constructor(private usersDataService: UsersDataService, private router: Router) { }

  ngOnInit() {
    this.usersDataService.getUsersData()
      .subscribe(users => this.users = users);
  }


  onSearch(){
    this.usersDataService.findUser(this.search)
      .subscribe(users => this.users = users);
  }

}
