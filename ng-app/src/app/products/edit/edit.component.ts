import {Component, ElementRef, ViewChild} from '@angular/core';
import {Product} from '../product';
import {ProductsDataService} from '../../service/products-data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  product: any = {};
  isNoData: boolean;
  inputCount: number;

  constructor(private route: ActivatedRoute,private productDataService: ProductsDataService, private router: Router) {
  };

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
  upQuantity(product: Product) {
    if (product.amount == null)
      product.amount = 0;
    product.amount++;
  }

  downQuantity(product: Product) {
    if (product.amount == null)
      product.amount = 0;
    if (product.amount > 0)
      product.amount--;
  }

  @ViewChild('fileInput') inputEl: ElementRef;

  addProduct(product: Product) {
    let result: Product;
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.productDataService.addProduct(product, inputEl.files.item(0))
      .subscribe(resultProduct => {
        result = resultProduct
        if (result != null) {
          this.router.navigate(['/list']);
        } else {
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
