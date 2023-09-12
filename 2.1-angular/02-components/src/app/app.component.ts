import { Component } from '@angular/core';
import { Product } from './model/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = '02-components';

  src = '';

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

  onLoaded(src: string) {
    console.log(`${src} loaded`);
  }
}
