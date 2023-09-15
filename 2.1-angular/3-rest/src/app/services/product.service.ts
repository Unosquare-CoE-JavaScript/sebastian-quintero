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
import { catchError, map, retry, switchMap, throwError, zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private endpointUrl = `${environment.apiBaseUrl}/api/v1/products`;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http
      .get<Product[]>(`${this.endpointUrl}?offset=0&limit=50`, {
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) =>
          products.map((product) => ({
            ...product,
            taxes: 0.19 * product.price,
          }))
        )
      );
  }

  findBy(offset: number, limit: number) {
    return this.http.get<Product[]>(this.endpointUrl, {
      params: { offset, limit },
    });
  }

  findOne(id: string) {
    return this.http.get<Product>(`${this.endpointUrl}/${id}`).pipe(
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
    return this.http.post<Product>(this.endpointUrl, data);
  }

  updateOne(id: string, data: UpdatableProduct) {
    return this.http.put<Product>(`${this.endpointUrl}/${id}`, data);
  }

  deleteOne(id: string) {
    return this.http.delete<boolean>(`${this.endpointUrl}/${id}`);
  }

  readAndUpdate(id: string) {
    this.findOne(id)
      .pipe(
        switchMap((product) =>
          this.updateOne(product.id, { title: 'New Title' })
        )
      )
      .subscribe(console.log);
    zip(this.findOne(id), this.updateOne(id, { price: 100 })).subscribe(
      ([found, updated]) => {
        console.log(found, updated);
      }
    );
  }
}
