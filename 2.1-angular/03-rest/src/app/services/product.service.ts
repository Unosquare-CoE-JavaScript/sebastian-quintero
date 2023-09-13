import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  CreatableProduct,
  Product,
  UpdatableProduct,
} from '../model/product.model';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Product[]>(`${this.baseUrl}?offset=0&limit=50`).pipe(
      retry(3),
      map((products) =>
        products.map((product) => ({ ...product, taxes: 0.19 * product.price }))
      )
    );
  }

  findBy(offset: number, limit: number) {
    return this.http.get<Product[]>(this.baseUrl, {
      params: { offset, limit },
    });
  }

  findOne(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        if (err.status === HttpStatusCode.InternalServerError) {
          return throwError(() => new Error('Server Error'));
        }
        if (err.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('Not Found'));
        }
        return throwError(() => new Error('Something goes wrong'));
      })
    );
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
