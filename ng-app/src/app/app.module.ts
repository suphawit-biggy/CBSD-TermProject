import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StudentsComponent} from './students/list/products.component';
import {StudentsAddComponent} from './students/add/products.add.component';
import {StudentsViewComponent} from './students/view/products.view.component';
import {FormsModule} from '@angular/forms';
import {StudentsDataService}from './service/products-data.service';
import {HttpModule} from '@angular/http';
import {MenuComponent} from './menu/menu.component';
import {FileNotFoundComponent} from './filenotfound/file-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {StudentRoutingModule} from './students/product-routing.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {StudentsDataServerService} from './service/products-data-server.service';
import {CourseListComponent} from './students/course-list/course-list.component';
import {AddCourseComponent} from './course/add-course/add-course.component';
import {ListCourseComponent} from './course/list-course/list-course.component';
import {CourseServerService} from './service/course-server.service';
import {CourseRoutingModule} from './course/course-routing.module';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './service/authentication.service';
import { StudentAddComponent } from './students/product-add/product-add.component';
import {SelectModule} from 'ng2-select';


@NgModule({
  declarations: [AppComponent,
    StudentsComponent,
    StudentsAddComponent,
    StudentsViewComponent,
    MenuComponent, FileNotFoundComponent,
    CourseListComponent,
    AddCourseComponent,
    ListCourseComponent,
    LoginComponent,
    StudentAddComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule,
    StudentRoutingModule, CourseRoutingModule,AppRoutingModule, SelectModule],
  bootstrap: [AppComponent],
  providers: [{provide: StudentsDataService, useClass: StudentsDataServerService},
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    CourseServerService,
    AuthenticationService
  ]
})
export class AppModule {
}
