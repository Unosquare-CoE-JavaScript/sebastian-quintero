import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.categoryService
        .createOne({
          name: data.name,
          image: data.image,
        })
        .subscribe((res) => this.router.navigate(['admin', 'categories']));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
