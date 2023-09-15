import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  counter = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.cart$.subscribe(
      (producs) => (this.counter = producs.length)
    );
  }
}
