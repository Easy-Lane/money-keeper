import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from '../../../../components/header-navigation/header-navigation.component';
import { DashboardMenuComponent } from '../../../../components/dashboard-menu/dashboard-menu.component';
import { PieChartComponent } from '../../../../components/charts/pie-charts/pie-chart.component';
import { ChartsButtonComponent } from '../../../../components/charts/charts-button/charts-button.component';

@Component({
    selector: 'line-chart-page',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderNavigationComponent,
        DashboardMenuComponent,
        ChartsButtonComponent,
        PieChartComponent,
    ],
    templateUrl: './line-chart-page.component.html',
    styleUrl: './styles/line-chart-page.master.scss',
})
export class LineChartPageComponent {
    public title: string = 'PieChart';

    public value: number[] = [1, 2, 3, 4, 5, 6];
    public labels: string[] = [
        'Еда',
        'Супермаркеты',
        'Развлечения',
        'Здоровье',
        'XD',
    ];

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }
}
