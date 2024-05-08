import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[buttonFocus]',
  standalone: true,
})
export class FocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
