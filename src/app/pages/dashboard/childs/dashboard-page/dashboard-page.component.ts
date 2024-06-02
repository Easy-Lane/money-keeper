import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderNavigationComponent } from '../../../../components/header-navigation/header-navigation.component';
import { DashboardHeaderComponent } from '../../../../components/dashboard-header/dashboard-header.component';
import { DashboardMenuComponent } from '../../../../components/dashboard-menu/dashboard-menu.component';
import { ChartsButtonComponent } from '../../../../components/charts/charts-button/charts-button.component';
import { PieChartComponent } from '../../../../components/charts/pie-charts/pie-chart.component';
import { LineChartComponent } from '../../../../components/charts/line-chart/line-chart.component';
import {IUserInterface, IUserToken} from '../../../../interfaces/IUserInterface';
import { ITotalData } from '../../../../interfaces/dashboard/ITotalData';
import { MonthExpensesPipe } from '../../../../pipes/month-expenses-pipe/month-expenses.pipe';
import { where } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { IDayExpenses } from '../../../../interfaces/calendar/IDayExpenses';
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
    ],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './styles/dashboard-page.master.scss',
})
export class DashboardPageComponent {
    private id!: string;
    private userService: IUserInterface = inject(IUserToken);
    private months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    protected ExpensesData: ITotalData = { monthTotal: 0, monthIncome: 0, typesValues: [], expensesTypes: []};

    constructor (
        private route: ActivatedRoute,
        private monthPipe: MonthExpensesPipe
    ) {
        route.queryParams.subscribe((params) => (this.id = params['uid']));
        this.userService
        .GetDocsBy(
            this.id,
            where('month', '==', this.months[new Date().getMonth()]),
            where('year', '==', new Date().getFullYear())
        )
        .pipe(take(1))
        .subscribe((expenses: [string, IDayExpenses][]) => {
           this.ExpensesData = this.monthPipe.transform(expenses);
        });
    }
}
