import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MenuComponent} from './menu/menu.component';
import {FileNotFoundComponent} from './filenotfound/file-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './service/authentication.service';
import {SelectModule} from 'ng2-select';
import {ProductsComponent} from './products/list/products.component';
import {ProductsAddComponent} from './products/add/products.add.component';
import {ProductsViewComponent} from './products/view/products.view.component';
import {ProductRoutingModule} from './products/product-routing.module';
import {ProductsDataService} from './service/products-data.service';
import {ProductsDataServerService} from './service/products-data-server.service';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';
import {CartComponent} from './products/cart/cart.component';
import {UserAddComponent} from './user/user-add/user-add.component';
import {UsersDataService} from './service/users-data.service';
import {UsersDataServerService} from './service/users-data-server.service';
import {UserListComponent} from './user/user-list/user-list.component';
import {UserRoutingModule} from './user/user-routing.module';
import { EditComponent } from './products/edit/edit.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [AppComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsViewComponent,
    MenuComponent,
    FileNotFoundComponent,
    LoginComponent,
    PurchaseHistoryComponent,
    CartComponent,
    UserAddComponent,
    UserListComponent,
    EditComponent,
    CheckoutComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule,
    UserRoutingModule, ProductRoutingModule, AppRoutingModule, SelectModule],
  bootstrap: [AppComponent],
  providers: [{provide: ProductsDataService, useClass: ProductsDataServerService},
    {provide: UsersDataService, useClass: UsersDataServerService},
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthenticationService,
  ]
})
export class AppModule {
}
