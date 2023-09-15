import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent {
  // Basic Inputs
  nameField = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');

  // Selects
  categoryField = new FormControl('');
  tagField = new FormControl('');

  // Checkbox & Radio
  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    color: new FormControl('#000000'),
    date: new FormControl(''),
    category: new FormControl(''),
    tag: new FormControl(''),
    agree: new FormControl(false, [Validators.requiredTrue]),
    gender: new FormControl(''),
    zone: new FormControl(''),
  });

  submit($event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAsTouched();
    }
  }
}
