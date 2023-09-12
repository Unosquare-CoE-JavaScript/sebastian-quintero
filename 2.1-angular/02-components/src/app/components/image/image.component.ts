import { Component, EventEmitter, Input, Output } from '@angular/core';

const DEFAULT = 'https://placehold.co/600x400/EEE/31343C';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() src: string = DEFAULT;

  @Output() loaded = new EventEmitter<string>();

  status: 'success' | 'failure' | null = null;

  onError() {
    this.src = DEFAULT;
    this.status = 'failure';
  }

  onLoad() {
    if (this.src != DEFAULT) {
      this.status = 'success';
    }
    this.loaded.emit(this.src);
  }
}
