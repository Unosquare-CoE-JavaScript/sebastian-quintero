import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy
{
  @Input() initialCount: number = 0;

  @Input() stopAt: number = Infinity;

  count: number = this.initialCount;

  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    console.log('constructor', this.count);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @Input() changes
    console.log('ngOnChanges', changes);
  }

  ngOnInit(): void {
    // trigger async operations here
    console.log('ngOnInit');

    this.intervalId = setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }

  ngAfterViewInit(): void {
    // handle children here
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');

    clearInterval(this.intervalId!);
  }
}
