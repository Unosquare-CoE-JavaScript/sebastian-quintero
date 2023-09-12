import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private shoppingCart: Product[] = [];

  private cart = new BehaviorSubject<Product[]>([]);

  get cart$() {
    return this.cart.asObservable();
  }

  addProduct(product: Product) {
    this.shoppingCart.push(product);
    this.cart.next(this.shoppingCart);
  }

  getAmount() {
    return this.shoppingCart.length;
  }

  getTotal() {
    return this.shoppingCart.reduce((sum, current) => sum + current.price, 0);
  }
}
