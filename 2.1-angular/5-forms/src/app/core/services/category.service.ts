import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Category,
  CreatableCategory,
  UpdatableCategory,
} from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${environment.url_api}/v1/categories`);
  }

  createOne(data: CreatableCategory) {
    return this.http.post<Category>(
      `${environment.url_api}/v1/categories`,
      data
    );
  }

  updateOne(id: string, data: UpdatableCategory) {
    return this.http.put<Category>(
      `${environment.url_api}/categories/${id}`,
      data
    );
  }
}
