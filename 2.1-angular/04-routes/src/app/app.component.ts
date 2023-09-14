import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private categoryService: CategoryService) {}

  get categories() {
    return this.categoryService.findAll();
  }
}
