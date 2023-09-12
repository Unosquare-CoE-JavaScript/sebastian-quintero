import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  defaultBackgroundColor = null;

  @HostListener('mouseenter') onMouseEnter() {
    this.defaultBackgroundColor =
      this.element.nativeElement.style.backgroundColor;
    this.element.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor =
      this.defaultBackgroundColor;
    this.defaultBackgroundColor = null;
  }

  constructor(private element: ElementRef) {}
}
