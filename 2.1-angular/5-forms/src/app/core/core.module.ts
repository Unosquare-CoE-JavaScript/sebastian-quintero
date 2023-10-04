import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService } from './services/products/products.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ProductsService, CategoryService],
})
export class CoreModule {}
