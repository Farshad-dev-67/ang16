import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(public product: ProductService) {}

  
  remove(i: number){
    this.product.removeProductSignal(i);
  }

}
