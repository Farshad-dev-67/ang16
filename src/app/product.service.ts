import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { IProduct } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products = toSignal<IProduct[]>(this.http.get<IProduct[]>('https://fakestoreapi.com/products'));
  public products$ = toObservable(this.products);

  public cartItems = signal<IProduct[]>([]);
  public subTotal = computed(() => 
  this.cartItems().reduce((prev: any, curr: any) => {
    return prev + curr.price;
  }, 0));
  public totalItems = computed(() => this.cartItems().length);
  constructor(private http: HttpClient) { }

  addProductSignal(product: IProduct) {
    this.cartItems.mutate((val) => {
      val.push(product);
    });
    this.products()?.forEach(a=>{
      if(a.id === product.id){
        a.rating.count = a.rating.count - 1;
      }
    })
  }

  removeProductSignal(id: number) {
    this.cartItems.mutate(val => {
      const product = val.splice(id, 1);
      this.products()?.forEach(a => {
        if (a.id === product[0].id) {
          a.rating.count = a.rating.count + 1;
        }
      })
    })
  }
}
