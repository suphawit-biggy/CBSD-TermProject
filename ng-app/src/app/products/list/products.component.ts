import {Component} from '@angular/core';
import {Product} from '../product';
import {ProductsDataService} from "../../service/products-data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[];
  search: string;

  constructor(private productDataService: ProductsDataService, private router: Router, private authenService: AuthenticationService) {
  }

  ngOnInit() {
    this.productDataService.getProductsData()
      .subscribe(products => this.products = products)
  }


  onSearch() {
    this.productDataService.findProduct(this.search)
      .subscribe(products => this.products = products)
  }

  showDetail(product: Product) {
    this.router.navigate(['/detail', product.id]);
  }

  checkDes(str: String) {
    if (str.length <= 50) {
      return str;
    } else {
      var text = "";
      var i = 0;
      for (i = 0; i < 47; i++) {
        text += str[i];
      }
      text += "...";
      return text;
    }
  }

  hasRole(role: string) {
    return this.authenService.hasRole(role);
  }

  addToCart(product: Product) {
    this.productDataService.addToCart(product);
  }
}
