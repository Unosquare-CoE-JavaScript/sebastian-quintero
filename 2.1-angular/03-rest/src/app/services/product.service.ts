import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreatableProduct,
  Product,
  UpdatableProduct,
} from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Product[]>(`${this.baseUrl}?offset=0&limit=50`);
  }

  findOne(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createOne(data: CreatableProduct) {
    return this.http.post<Product>(this.baseUrl, data);
  }

  updateOne(id: string, data: UpdatableProduct) {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, data);
  }

  deleteOne(id: string) {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
