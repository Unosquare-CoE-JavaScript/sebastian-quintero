import { Component } from '@angular/core';
import { StoreService } from './services/store.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  token = '';

  value = '02-components';

  src = '';

  isCounterEnabled = true;

  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private authService: AuthService
  ) {}

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

  createUser() {
    this.userService
      .createOne({
        name: 'Paco',
        email: 'pac@rdar.se',
        password: 'pass123',
        avatar: 'https://i.pravatar.cc/300',
      })
      .subscribe(console.log);
  }

  login() {
    this.authService.login('pac@rdar.se', 'pass123').subscribe((data) => {
      this.token = data.access_token;
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe(console.log);
  }
}
