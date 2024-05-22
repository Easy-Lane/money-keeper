import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from './components/header-navigation/header-navigation.component';
import { CurrencyService } from './services/currency-services/currency.service';
import { BreadcrumbService } from './services/breadcrumb-service/breadcrumb.service';
import { BreadcrumbComponent } from './components/breadcrumbs/breadcrumbs.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderNavigationComponent, BreadcrumbComponent],
	providers: [CurrencyService, BreadcrumbService],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public title: string = 'money keeper';
}
