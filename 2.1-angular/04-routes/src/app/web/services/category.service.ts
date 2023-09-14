import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = [
    { id: '1', name: 'Clothes' },
    { id: '2', name: 'Electronics' },
    { id: '3', name: 'Furniture' },
  ];

  constructor() {}

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    return this.categories.find((category) => category.id === id);
  }
}
