/**
 * Created by Biggy's Dell Laptop on 5/14/2017.
 */
import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserAddComponent} from './user-add/user-add.component';

const userRoutes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'user-add', component: UserAddComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {
}
