import { Component } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = '02-components';

  src = '';

  isCounterEnabled = true;

  constructor(private storeService: StoreService) {}

  get amount() {
    return this.storeService.getAmount();
  }

  get total() {
    return this.storeService.getTotal();
  }

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
