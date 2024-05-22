import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'currencyPipe',
	standalone: true,
	pure: false,
})
export class CurrencyPipe implements PipeTransform {
	public result: string = '₽';

	transform(value: number, currency: string) {
		if (currency === '₽') return value * 35 + currency;
		else return value + currency;
	}
}
