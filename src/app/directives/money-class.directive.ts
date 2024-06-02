import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appMoneyClass]',
    standalone: true,
})
export class MoneyClassDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @Input('appMoneyClass') set moneyClass(value: string) {
        if (value.charAt(value.length - 1) == 'i') {
            if (value.length > 11) {
                this.renderer.addClass(
                    this.el.nativeElement,
                    'header__money__incomes__text-long'
                );
            } else {
                this.renderer.addClass(
                    this.el.nativeElement,
                    'header__money__incomes__text'
                );
            }
        } else {
            if (value.length > 11) {
                this.renderer.addClass(
                    this.el.nativeElement,
                    'header__money__expenses__text-long'
                );
            } else {
                this.renderer.addClass(
                    this.el.nativeElement,
                    'header__money__expenses__text'
                );
            }
        }
    }
}
