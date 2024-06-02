import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const CurrencyServiceToken = new InjectionToken<CurrencyService>(
    'Currency'
);

@Injectable({
    providedIn: 'root',
})
export class CurrencyService {
    private currencyStatus: BehaviorSubject<string> =
        new BehaviorSubject<string>('₽');

    readonly currentCurrency = this.currencyStatus.asObservable();

    public changeCurrency(value: string) {
        this.currencyStatus.next(value);
    }
}
