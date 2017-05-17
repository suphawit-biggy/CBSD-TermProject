import {Component} from '@angular/core';
import {ProductsDataService} from '../../service/products-data.service';
import {Product} from '../product';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartArray: Product[];

  constructor(private productDataService: ProductsDataService, private router: Router, private authenService: AuthenticationService) {
  }

  ngOnInit() {
    this.productDataService.getCartData()
      .subscribe(cartArray => this.cartArray = cartArray);
  }

  removeFromCart(id: number) {
    for (let i = 0; i < this.cartArray.length; i++) {
      if (id == this.cartArray[i].id) {
        this.cartArray.splice(i, 1);
      }
    }
  }

  hasRole(role: string) {
    return this.authenService.hasRole(role);
  }

  checkOut(){
    if(this.hasRole('USER'))
      this.router.navigate(['/check-out']);
    else {
      alert('Please login before checkout the product');
      this.router.navigate(['/login']);
    }
  }

}
