import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-services/user.service';
import { CurrencyService } from '../../services/currency-services/currency.service';
import { CurrencyPipe } from '../../pipes/currency-pipe/currency.pipe';
import { BreadcrumbComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
	selector: 'dashboard-menu',
	standalone: true,
	providers: [UserService],
	templateUrl: './dashboard-menu.component.html',
	styleUrl: './styles/dashboard-menu.master.scss',
	imports: [RouterOutlet, CommonModule, CurrencyPipe, BreadcrumbComponent],
})
export class DashboardMenuComponent {
	public currencySymbol: string = '₽';
	public num = 1000;
	constructor(
		public currencyService: CurrencyService,
		private userService: UserService
	) {}
	public userImage: string = this.userService.getImage();
	public currency: string = '/assets/images/rub.svg';

	public async changeCurrency() {
		switch (this.currency) {
			case '/assets/images/currency.svg': {
				this.currency = '/assets/images/rub.svg';
				this.currencyService.changeCurrency('₽');
				break;
			}
			default: {
				this.currency = '/assets/images/currency.svg';
				this.currencyService.changeCurrency('$');
				break;
			}
		}
	}
}