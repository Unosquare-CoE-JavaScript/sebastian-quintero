import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private storeService: StoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe((data) => (this.products = data));
  }

  onAddProduct(product: Product) {
    this.storeService.addProduct(product);
  }
}
