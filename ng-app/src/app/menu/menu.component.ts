import {Component} from '@angular/core';
import {Product} from "../products/product";
import {ProductsDataService} from "../service/products-data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private productDataService: ProductsDataService, private router: Router,
              private authenService: AuthenticationService) {
  }

  products: Product[];

  ngOnInit() {
    this.productDataService.getProductsData()
      .subscribe(products => this.products = products);
  }

  hasRole(role: string) {
    return this.authenService.hasRole(role);
  }

  hasNotRole(role: string) {
    return this.authenService.hasNotRole(role);
  }
}
