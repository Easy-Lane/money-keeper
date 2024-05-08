import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../../services/currency-services/currency.service';

@Pipe({
  name: 'currencyPipe',
  standalone: true,
  pure: false,
})
export class CurrencyPipe implements PipeTransform {
  public result: string = '₽';
  constructor(private currencyService: CurrencyService) {}

  getValue(value: string) {
    this.result = value;
  }

  transform(value: number, currency: string) {
    if (currency === '₽') return value * 100 + currency;
    else return value + currency;
  }
}
