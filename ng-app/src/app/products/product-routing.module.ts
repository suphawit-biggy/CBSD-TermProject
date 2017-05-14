import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {ProductsComponent} from './list/products.component';
import {ProductsAddComponent} from './add/products.add.component';
import {ProductsViewComponent} from './view/products.view.component';

const productRoutes: Routes = [
  {path: 'detail/:id',component:ProductsViewComponent},
  {path: 'view', component: ProductsViewComponent},
  {path: 'add', component: ProductsAddComponent},
  {path: 'list', component: ProductsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentRoutingModule {
}
