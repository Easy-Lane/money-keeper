import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currencyPipe',
    standalone: true,
    pure: false,
})
export class CurrencyPipe implements PipeTransform {
    transform(value: number, currency: string): string {
        if (currency === '₽') return value * 35 + currency;
        else return value + currency;
    }
}
