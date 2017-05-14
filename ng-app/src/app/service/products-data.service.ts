import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from '../products/product';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductsDataService {
  constructor(private http: Http) {
  }

  getProductsData() {
    let productArray: Product[];
    return this.http.get('app/data/people.json')
      .map(res => res.json().products);
  }

  getProduct(id: number) {
    return null;
  }

  addProduct(product: Product, imageFile: any) {
    return null;
  }

  findProduct(search: string) {
    return null;
  }

  removeProoduct(id: number) {
    return null;
  }

}
