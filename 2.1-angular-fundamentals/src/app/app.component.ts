import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nameList = ['John', 'Bob', 'Any'];

  name = 'Sebastian';
  age = 28;
  src = 'https://www.w3schools.com/howto/img_avatar.png';
  btnDisabled = false;

  person = {
    name: 'Sebastian',
    age: 28,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  };

  disabled = false;

  newName = '';

  toggleButton() {
    this.disabled = !this.disabled;
  }

  increment() {
    this.age++;
  }

  onScroll(event: Event) {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    console.log(event.target.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  addName() {
    this.nameList.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.nameList.splice(index, 1);
  }
}
