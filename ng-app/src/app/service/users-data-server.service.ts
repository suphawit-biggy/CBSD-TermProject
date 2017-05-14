import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersDataServerService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {
  }

  private headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  addUser(user: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:8080/productAuthen', body).map(res => {
      return res.json()
    })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }

}
