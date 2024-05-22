import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

export const routes: Routes = [
	{ path: '', component: WelcomePageComponent },
	{
		path: 'dashboard',
		loadComponent: () =>
			import('./pages/dashboard-page/dashboard-page.component').then(
				(m) => m.DashboardPageComponent
			),
		data: {
			breadcrumb: 'Dashboard',
		},
		children: [
			{
				path: 'pie-chart',
				loadComponent: () =>
					import('./pages/pie-chart-page/pie-chart-page.component').then(
						(m) => m.PieChartPageComponent
					),
				data: {
					breadcrumb: 'Pie-Chart',
				},
			},
			{
				path: 'line-chart',
				loadComponent: () =>
					import('./pages/line-chart-page/line-chart-page.component').then(
						(m) => m.LineChartPageComponent
					),
				data: {
					breadcrumb: 'Line-Chart',
				},
			},
		],
	},
];
