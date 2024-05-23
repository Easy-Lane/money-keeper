import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { CommonModule } from '@angular/common';
import {
    CurrencyService,
    CurrencyServiceToken,
} from '../../services/currency-services/currency.service';
import { CurrencyPipe } from '../../pipes/currency-pipe/currency.pipe';

@Component({
    selector: 'dashboard-header',
    standalone: true,
    providers: [UserService],
    templateUrl: './dashboard-header.component.html',
    styleUrl: './styles/dashboard-header.master.scss',
    imports: [RouterOutlet, CommonModule, CurrencyPipe],
})
export class DashboardHeaderComponent implements OnInit {
    public currencySymbol: string = '₽';
    constructor(
        public currencyService: CurrencyService,
        private userService: UserService
    ) {}
    ngOnInit(): void {
        this.currencyService.currentCurrency.subscribe(
            (currency) => (this.currencySymbol = currency)
        );
    }
    public username: string = this.userService.getFirstName();
    public lastName: string = this.userService.getLastName();
    public incomes: number = this.userService.getIncomes();
    public expenses: number = this.userService.getExpenses();
    public image: string = this.userService.getImage();

    public isIncomesLong: boolean = this.incomes.toString().length > 10;
    public isExpensesLong: boolean = this.expenses.toString().length > 10;
}
