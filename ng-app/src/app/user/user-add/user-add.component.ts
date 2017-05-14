import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../products/product';
import {UsersDataService} from '../../service/users-data.service';
import {User} from '../user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user:any = {};
  roles:Array<string> = ['User','Admin','Staff'];
  public refreshValue(value:any):void {
    this.user.role = value.text;
  }

  constructor(private usersDataService: UsersDataService, private router: Router) {
  };

  ngOnInit() {
    this.user = new User();
  }

  @ViewChild('fileInput') inputEl: ElementRef;
  addUser(user: any) {
    let result: any;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.usersDataService.addUser(this.user)
      .subscribe(resultUser => {
        result = resultUser
        if (result != null){
          this.router.navigate(['/user-list']);
        }else{
          alert("Error in adding the user");
        }
      });
  }

  isValid():boolean{
    if (!this.user.role)
      return false;
    return true;
  }

}
