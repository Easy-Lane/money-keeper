import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency-services/currency.service';
import { CurrencyPipe } from '../../pipes/currency-pipe/currency.pipe';
import { IUserInfo } from '../../interfaces/IUserInfo';
import { User } from '../../app.config';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { MoneyClassDirective } from '../../directives/money-class.directive';

@Component({
    selector: 'app-dashboard-header',
    standalone: true,
    templateUrl: './dashboard-header.component.html',
    styleUrl: './styles/dashboard-header.master.scss',
    imports: [
        RouterOutlet,
        CommonModule,
        CurrencyPipe,
        SkeletonComponent,
        MoneyClassDirective,
    ],
})
export class DashboardHeaderComponent implements OnInit {
    public currencySymbol: string = '₽';
    private user: IUserInfo = inject(User);

    readonly username: string = this.user.username!;
    @Input() public incomes: number = 0;
    @Input() public expenses: number = 0;
    readonly image: string = '../assets/images/default-avatar.png';
    public contentLoaded: boolean = false;

    constructor(public currencyService: CurrencyService) {}
    ngOnInit(): void {
        setTimeout((): void => {
            this.contentLoaded = true;
        }, 2000);

        this.currencyService.currentCurrency.subscribe(
            (currency) => (this.currencySymbol = currency)
        );
    }
}
