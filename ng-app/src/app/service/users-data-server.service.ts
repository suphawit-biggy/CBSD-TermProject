import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Http, Headers, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../user/user';

@Injectable()
export class UsersDataServerService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {
  }

  private headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  getUsersData() {
    let userArray: User[];
    return this.http.get('http://localhost:8080/user', ({headers: this.headers}))
      .map(res => res.json())
      .catch((error: any) => {
        return Observable.throw(new Error('UnAuthorize'));
      });

  }

  getUser(id: number) {
    let user: User;
    return this.http.get('http://localhost:8080/user/' + id, ({headers: this.headers}))
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json()
          }
          if (res.status === 204) {
            return null;
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 409) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 406) {
          return Observable.throw(new Error(error.status));
        }
        return error;
      })
      ;


  }

  findUser(search: string) {
    let user: User;
    let params: URLSearchParams = new URLSearchParams();
    params.set('search', search);
    return this.http.get('http://localhost:8080/Users/', {headers: this.headers, search: params})
      .map(res => res.json());

  }

  addUser(user: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:8080/userAuthen', body).map(res => {
      return res.json()
    })
      .catch((error: any) => {
        return Observable.throw(new Error(error.status))
      })
  }
}
