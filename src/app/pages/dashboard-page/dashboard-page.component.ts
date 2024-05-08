import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
import { DashboardMenuComponent } from '../../components/dashboard-menu/dashboard-menu.component';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ChartsButtonComponent } from '../../components/charts/charts-button/charts-button.component';
import { PieChartComponent } from '../../components/charts/pie-charts/pie-chart.component';
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderNavigationComponent,
    DashboardHeaderComponent,
    DashboardMenuComponent,
    ChartsButtonComponent,
    PieChartComponent,
    LineChartComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './styles/dashboard-page.master.scss',
})
export class DashboardPageComponent {
  public title: string = 'Dashboard';

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
