import { Component, OnInit } from '@angular/core';
import {
  CreatableProduct,
  Product,
  UpdatableProduct,
} from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  offset = 0;
  limit = 10;

  productDetails: Product = {
    id: '',
    images: [],
    price: 0,
    title: '',
    category: { id: 0, name: '' },
    description: '',
  };

  products: Product[] = [];

  isDetailsShown = false;

  constructor(
    private storeService: StoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe((data) => (this.products = data));
  }

  onShowDetail(id: string) {
    this.productService.findOne(id).subscribe((data) => {
      this.isDetailsShown = true;
      this.productDetails = data;
    });
  }

  onAddProduct(product: Product) {
    this.storeService.addProduct(product);
  }

  toggleDetails() {
    this.isDetailsShown = !this.isDetailsShown;
  }

  createNewProduct() {
    const product: CreatableProduct = {
      title: 'New Product',
      description: 'bla bla bla',
      images: ['https://picsum.photos/640/640'],
      categoryId: 1,
      price: 1000,
    };

    this.productService
      .createOne(product)
      .subscribe((data) => this.products.unshift(data));
  }

  updateProduct() {
    const changes: UpdatableProduct = {
      title: 'Modified Title',
    };
    this.productService
      .updateOne(this.productDetails.id, changes)
      .subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === data.id
        );
        this.products[productIndex] = data;
      });
  }

  deleteProduct() {
    this.productService.deleteOne(this.productDetails.id).subscribe(() => {
      this.isDetailsShown = false;
      this.products = this.products.filter(
        (product) => product.id !== this.productDetails.id
      );
    });
  }

  loadMore() {
    this.productService.findBy(this.offset, this.limit).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
