import {Component} from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductsDataService} from "../../service/products-data.service";
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'products-view',
  templateUrl: './products.view.component.html',
  styleUrls: ['./products.view.component.css']
})
export class ProductsViewComponent {
  constructor(private route: ActivatedRoute, private productDataService: ProductsDataService) {
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

  removeProduct(id: number) {
    this.productDataService.removeProoduct(id)
  }
}
