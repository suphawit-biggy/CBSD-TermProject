import {Component} from '@angular/core';
import {Product} from '../product';
import {ProductsDataService} from "../../service/products-data.service";
import {Router} from "@angular/router";


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[];
  search:string;
  constructor(private productDataService: ProductsDataService, private router: Router ) {
  }

  ngOnInit() {
    this.productDataService.getProductsData()
      .subscribe(products => this.products = products,
        (error : Error ) => {
          if (error.message === 'UnAuthorize'){
            this.router.navigate(['login'],{queryParams:{source:'product'}});
          }
        });
  }


  onSearch(){
    this.productDataService.findProduct(this.search)
      .subscribe(products => this.products = products,
        (error : Error ) => {
          if (error.message === 'UnAuthorize'){
            this.router.navigate(['login'],{queryParams:{source:'product'}});
          }
        });
  }

  showDetail(product: Product){
    this.router.navigate(['/detail',product.id]);
  }

  checkDes(str: String) {
    if (str.length <= 50) {
      return str;
    } else {
      var text ="";
      var i=0;
      for(i=0;i < 47;i++) {
        text += str[i];
      }
      text += "...";
      return text;
    }
  }
}
