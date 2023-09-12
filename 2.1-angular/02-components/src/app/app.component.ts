import { Component } from '@angular/core';
import { Product } from './model/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = '02-components';

  src = '';

  isCounterEnabled = true;

  onLoaded(src: string) {
    console.log(`${src} loaded`);
  }

  startCounter() {
    this.isCounterEnabled = true;
  }

  stopCounter() {
    this.isCounterEnabled = false;
  }
}
