import {
    CUSTOM_ELEMENTS_SCHEMA,
    Component,
    NO_ERRORS_SCHEMA, OnInit,
    inject,
} from '@angular/core';
import { ChartsButtonComponent } from '../charts-button/charts-button.component';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TuiSizeXL } from '@taiga-ui/core';
import { ForChartsDirective } from '../../../directives/for-charts.directive';
import {SkeletonComponent} from "../../skeleton/skeleton.component";
import { IUserInterface, IUserToken } from '../../../interfaces/IUserInterface';
import { ActivatedRoute } from '@angular/router';
import { where } from '@angular/fire/firestore';
import { take } from 'rxjs';
import { IDayExpenses } from '../../../interfaces/calendar/IDayExpenses';
import { MonthExpensesPipe } from '../../../pipes/month-expenses-pipe/month-expenses.pipe';

@Component({
    selector: 'pie-chart',
    standalone: true,
    imports: [
        ChartsButtonComponent,
        TuiPieChartModule,
        CommonModule,
        NgTemplateOutlet,
        ForChartsDirective,
        SkeletonComponent
    ],
    templateUrl: './pie-chart.component.html',
    styleUrl: './styles/pie-chart.master.scss',
    providers: [MonthExpensesPipe]
})
export class PieChartComponent implements OnInit{
    public contentLoaded: boolean = false;
    public size: TuiSizeXL = 'xl';
    public title: string = 'Expenses category';
    public values: number[] = [];
    public labels: string[] = [];
    private id!: string;
    private userService: IUserInterface = inject(IUserToken);

    constructor ( 
        private route: ActivatedRoute,
        private monthPipe: MonthExpensesPipe
    ) {
        route.queryParams.subscribe((params) => (this.id = params['uid']));
    }

    public ngOnInit(): void {
        setTimeout((): void => {
            this.contentLoaded = true;
        }, 2000);
        this.userService.GetDocsBy(
            this.id,
            where('month', '==', "May"),
            where('year', '==', 2024)
        )
            .pipe(take(1))
            .subscribe((expenses: [string, IDayExpenses][]) => {
               const temp = this.monthPipe.transform(expenses)
               this.labels = temp[0];
               this.values = temp[1];
            });
    }

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }
}
