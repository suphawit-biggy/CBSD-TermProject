import {Component} from '@angular/core';
import {Product} from "../products/product";
import {ProductsDataService} from "../service/products-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private productDataService: ProductsDataService, private router: Router,
              private authenticationService: AuthenticationService, private route: ActivatedRoute) {
  }

  products: Product[];
  error = '';

  ngOnInit() {
    this.productDataService.getProductsData()
      .subscribe(products => this.products = products);
  }

  hasRole(role: string) {
    return this.authenticationService.hasRole(role);
  }

  logout() {
    this.authenticationService.logout();
    let source: String;
    this.route.queryParams.subscribe(
      params => {
        if (params['source'])
          source = params['source'];
        else
          source = null;
      }
    )

    if (source) {
      this.error = 'Please login before use ' + source + ' page';
    }

    this.router.navigate(['/list']);
  }
}
