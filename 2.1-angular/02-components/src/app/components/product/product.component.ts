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
    image: '',
    price: 0,
    name: '',
  };

  @Output() added = new EventEmitter<Product>();

  onAdd() {
    this.added.emit(this.product);
  }
}
