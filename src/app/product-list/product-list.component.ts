import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(public product: ProductService){}

  addToCart(item: IProduct){
    this.product.addProductSignal(item);
  }
}
