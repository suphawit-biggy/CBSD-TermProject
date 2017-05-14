import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../user/user';

@Injectable()
export class UsersDataService {

  constructor(private http: Http) { }

  getUsersData() {
    let userArray: User[];
    return this.http.get('app/data/user.json')
      .map(res => res.json().users);
  }

  getUser(id: number) {
    return null;
  }

  addUser(user: any) {
    return null;
  }

  findUser(search: string) {
    return null;
  }
}
