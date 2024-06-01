import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ChartsButtonComponent } from '../charts-button/charts-button.component';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TuiSizeXL } from '@taiga-ui/core';
import { ForChartsDirective } from '../../../directives/for-charts.directive';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { MonthExpensesPipe } from '../../../pipes/month-expenses-pipe/month-expenses.pipe';

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [
        ChartsButtonComponent,
        TuiPieChartModule,
        CommonModule,
        NgTemplateOutlet,
        ForChartsDirective,
        SkeletonComponent,
    ],
    templateUrl: './pie-chart.component.html',
    styleUrl: './styles/pie-chart.master.scss',
    providers: [MonthExpensesPipe],
})
export class PieChartComponent implements OnInit {
    public contentLoaded: boolean = false;
    public size: TuiSizeXL = 'xl';
    public title: string = 'Expenses category';
    @Input() public values: number[] = [];
    @Input() public labels: string[] = [];

    constructor(
    ) {
    }

    public ngOnInit(): void {
        setTimeout((): void => {
            this.contentLoaded = true;
        }, 2000);
    }

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }
}
