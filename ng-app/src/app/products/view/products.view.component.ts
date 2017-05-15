import {Component} from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductsDataService} from "../../service/products-data.service";
import 'rxjs/add/operator/switchMap';
import {AuthenticationService} from '../../service/authentication.service';
@Component({
  selector: 'products-view',
  templateUrl: './products.view.component.html',
  styleUrls: ['./products.view.component.css']
})
export class ProductsViewComponent {
  constructor(private route: ActivatedRoute, private productDataService: ProductsDataService, private  authenService: AuthenticationService, private router: Router) {
  }

  product: Product;
  isNoData: boolean;
  inputCount: number;

  ngOnInit() {
    this.isNoData = false;
    this.inputCount = 15;
    this.route.params
      .switchMap((params: Params) => this.productDataService.getProduct(+params['id']))
      .subscribe((product: Product) => {
          if (product !== null)
            this.product = product;
          else
            this.isNoData = true;
        }
      );
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit', product.id]);
  }

  removeProduct(id: number) {
    this.productDataService.removeProoduct(id)
  }

  hasRole(role: string) {
    return this.authenService.hasRole(role);
  }
}
