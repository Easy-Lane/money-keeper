import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from '../../../../components/header-navigation/header-navigation.component';
import { DashboardMenuComponent } from '../../../../components/dashboard-menu/dashboard-menu.component';
import { PieChartComponent } from '../../../../components/charts/pie-charts/pie-chart.component';
import { ChartsButtonComponent } from '../../../../components/charts/charts-button/charts-button.component';
import { LineChartComponent } from '../../../../components/charts/line-chart/line-chart.component';

@Component({
    selector: 'line-chart-page',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderNavigationComponent,
        DashboardMenuComponent,
        LineChartComponent,
    ],
    templateUrl: './line-chart-page.component.html',
    styleUrl: './styles/line-chart-page.master.scss',
})
export class LineChartPageComponent {}
