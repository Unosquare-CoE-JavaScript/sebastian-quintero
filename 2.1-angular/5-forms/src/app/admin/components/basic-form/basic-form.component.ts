import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent {
  // Basic Inputs
  nameField = new FormControl('');
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');

  // Selects
  categoryField = new FormControl('');
  tagField = new FormControl('');

  //
  agreeField = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');
}
