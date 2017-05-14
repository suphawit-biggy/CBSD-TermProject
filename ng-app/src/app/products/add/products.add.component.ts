import {Component,ElementRef, Input, ViewChild} from '@angular/core';
import {Product} from '../product';
import {Router} from "@angular/router";
import {ProductsDataService} from "../../service/products-data.service";

@Component({
  selector: 'products-add',
  templateUrl: './products.add.component.html',
  styleUrls: ['./products.add.component.css']
})
export class ProductsAddComponent {
  product: any = {};

  constructor(private productDataService: ProductsDataService, private router: Router) {
  };

  ngOnInit() {
    this.product = new Product();
  }

  upQuantity(product: Product) {
    product.amount++;
  }

  downQuantity(product: Product) {
    if (product.amount > 0)
      product.amount--;
  }

  @ViewChild('fileInput') inputEl: ElementRef;
  addProduct(product: Product) {
    let result: Product;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.productDataService.addProduct(product,inputEl.files.item(0))
      .subscribe(resultProduct => {
        result = resultProduct
        if (result != null){
          this.router.navigate(['/list']);
        }else{
          alert("Error in adding the product");
        }
      });
  }

  onFileChange(event, product: any) {
    var filename = event.target.files[0].name;
    console.log(filename);
    product.image = filename;
    product.file = event.target.files[0];
  }
}
