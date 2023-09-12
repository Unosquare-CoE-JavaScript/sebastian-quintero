import { Component } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: '1',
      image: 'https://placehold.co/600x400/png',
      price: 33,
      name: 'Product 1',
    },
    {
      id: '2',
      image: 'https://placehold.co/600x400/png',
      price: 123,
      name: 'Product 2',
    },
    {
      id: '3',
      image: 'https://placehold.co/600x400/png',
      price: 325,
      name: 'Product 3',
    },
    {
      id: '4',
      image: 'https://placehold.co/600x400/png',
      price: 45,
      name: 'Product 4',
    },
  ];
}
