import {Component} from '@angular/core';
import {Student} from "../students/product";
import {StudentsDataService} from "../service/products-data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
@Component({
 selector: 'menu',
 templateUrl: './menu.component.html',
 styleUrls:['./menu.component.css']
})
export class MenuComponent {
  constructor(private studentDataService: StudentsDataService, private router: Router,
    private authenService:AuthenticationService) {
  }
  students:Student[];
  ngOnInit() {
    this.studentDataService.getStudentsData()
      .subscribe(students => this.students = students);
  }
  showDetail(student: Student){
    this.router.navigate(['/detail',student.id]);
  }

  hasRole(role:string){
    return this.authenService.hasRole(role);
  }
}
