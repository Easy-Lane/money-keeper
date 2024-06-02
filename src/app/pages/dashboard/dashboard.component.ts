import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
import { DashboardMenuComponent } from '../../components/dashboard-menu/dashboard-menu.component';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header.component';
import { ChartsButtonComponent } from '../../components/charts/charts-button/charts-button.component';
import { PieChartComponent } from '../../components/charts/pie-charts/pie-chart.component';
import { LineChartComponent } from '../../components/charts/line-chart/line-chart.component';
import { BreadcrumbComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbService } from '../../services/breadcrumb-service/breadcrumb.service';
import { MonthExpensesPipe } from '../../pipes/month-expenses-pipe/month-expenses.pipe';


@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderNavigationComponent,
        DashboardHeaderComponent,
        DashboardMenuComponent,
        ChartsButtonComponent,
        PieChartComponent,
        LineChartComponent,
        BreadcrumbComponent,
    ],
    providers: [BreadcrumbService, MonthExpensesPipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './childs/dashboard-page/styles/dashboard-page.master.scss',
})
export class DashboardComponent {}


