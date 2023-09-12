import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  value = '02-components';

  src = '';

  onLoaded(src: string) {
    console.log(`${src} loaded`);
  }
}
