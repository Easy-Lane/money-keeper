import { Component, Input, OnInit } from '@angular/core';
import { IExpensesInfo } from '../../../interfaces/calendar/IExpenses';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../../pipes/currency-pipe/currency.pipe';
import { CurrencyService } from '../../../services/currency-services/currency.service';
@Component({
    selector: 'app-expense-card',
    standalone: true,
    imports: [CommonModule, CurrencyPipe],
    templateUrl: './expense-card.component.html',
    styleUrl: './expense-card.component.scss',
})
export class ExpenseCardComponent implements OnInit {
    @Input() public info!: IExpensesInfo;
    public currencySymbol: string = '₽';
    constructor(public currencyService: CurrencyService) {}
    ngOnInit(): void {
        this.currencyService.currentCurrency.subscribe(
            (currency) => (this.currencySymbol = currency)
        );
    }
}
