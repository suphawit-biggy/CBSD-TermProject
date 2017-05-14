import {Injectable} from '@angular/core';
import {Product} from '../products/product';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Rx";
import {AuthenticationService} from './authentication.service';


@Injectable()
export class ProductsDataServerService {
  constructor(private http: Http, private authenticationService: AuthenticationService) {
  }

  private headers = new Headers({
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  getProductsData() {
    let productArray: Product[];
    return this.http.get('http://localhost:8080/product', ({headers: this.headers}))
      .map(res => res.json())
      .catch((error: any) => {
        return Observable.throw(new Error('UnAuthorize'));
      });

  }

  getProduct(id: number) {
    let product: Product;
    return this.http.get('http://localhost:8080/product/' + id, ({headers: this.headers}))
      .map((res: Response) => {
        if (res) {
          if (res.status === 200) {
            return res.json()
          }
          if (res.status === 204) {
            return null;
          }
        }
      })
      .catch((error: any) => {
        if (error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 400) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 409) {
          return Observable.throw(new Error(error.status));
        }
        else if (error.status === 406) {
          return Observable.throw(new Error(error.status));
        }
        return error;
      })
      ;


  }

  findProduct(search: string) {
    let product: Product;
    let params: URLSearchParams = new URLSearchParams();
    params.set('search', search);
    return this.http.get('http://localhost:8080/products/', {headers: this.headers, search: params})
      .map(res => res.json());

  }

  addProduct(product: Product, file: any) {
    let formData = new FormData();
    let fileName: string;
    formData.append('file', file);
    let header = new Headers({'Authorization': 'Bearer ' + this.authenticationService.getToken()});
    let options = new RequestOptions({headers: header});
    return this.http.post('http://localhost:8080/product/image', formData, options)
      .flatMap(filename => {
        product.image = filename.text();
        let headers = new Headers({'Content-Type': 'application/json',});
        let options = new RequestOptions({headers: this.headers});
        let body = JSON.stringify(product);
        return this.http.post('http://localhost:8080/product', body, options)
          .map(res => {
            return res.json()
          })
          .catch((error: any) => {
            return Observable.throw(new Error(error.status))
          })
      })
  }

  removeProduct(id: number) {
    return this.http.delete('http://localhost:8080/product/' + id)
  }
}
