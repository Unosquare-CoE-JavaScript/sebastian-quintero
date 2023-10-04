import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = {
    id: '',
    images: [],
    price: 0,
    title: '',
    category: { id: 0, name: '' },
    description: '',
  };

  @Output() showed = new EventEmitter<string>();

  @Output() added = new EventEmitter<Product>();

  onShowDetail() {
    this.showed.emit(this.product.id);
  }

  onAdd() {
    this.added.emit(this.product);
  }
}
