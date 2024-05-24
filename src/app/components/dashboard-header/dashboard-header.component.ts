import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { CommonModule } from '@angular/common';
import {
    CurrencyService,
    CurrencyServiceToken,
} from '../../services/currency-services/currency.service';
import { CurrencyPipe } from '../../pipes/currency-pipe/currency.pipe';
import { Observable, take } from 'rxjs';
import { IUserInfo } from '../../interfaces/IUserInfo';
import { User } from '../../app.config';

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
    public user: IUserInfo = inject(User);

    public username: string = this.user.username!;
    public lastName: string = '';
    public incomes: number = this.userService.getIncomes();
    public expenses: number = this.userService.getExpenses();
    public image: string = this.userService.getImage();

    constructor(
        public currencyService: CurrencyService,
        private userService: UserService
    ) {}
    ngOnInit(): void {
        this.currencyService.currentCurrency.subscribe(
            (currency) => (this.currencySymbol = currency)
        );
    }

    public isIncomesLong: boolean = this.incomes.toString().length > 10;
    public isExpensesLong: boolean = this.expenses.toString().length > 10;
}
