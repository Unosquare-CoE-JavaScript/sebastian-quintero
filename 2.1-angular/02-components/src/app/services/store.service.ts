import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cart: Product[] = [];

  constructor() {}

  addProduct(product: Product) {
    this.cart.push(product);
  }

  getAmount() {
    return this.cart.length;
  }

  getTotal() {
    return this.cart.reduce((sum, current) => sum + current.price, 0);
  }
}
