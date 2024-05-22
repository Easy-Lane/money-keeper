import {
    CUSTOM_ELEMENTS_SCHEMA,
    Component,
    NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ChartsButtonComponent } from '../charts-button/charts-button.component';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TuiSizeXL } from '@taiga-ui/core';
import { ForChartsDirective } from '../../../directives/for-charts.directive';

@Component({
    selector: 'pie-chart',
    standalone: true,
    imports: [
        ChartsButtonComponent,
        TuiPieChartModule,
        CommonModule,
        NgTemplateOutlet,
        ForChartsDirective,
    ],
    templateUrl: './pie-chart.component.html',
    styleUrl: './styles/pie-chart.master.scss',
})
export class PieChartComponent {
    public size: TuiSizeXL = 'xl';
    public title: string = 'Категории расходов';
    public values: number[] = [5, 6, 3, 4, 5];
    public labels: string[] = [
        'Еда',
        'Супермаркеты',
        'Развлечения',
        'Здоровье',
        'Учёба',
        'Боль',
        'Еда',
        'Супермаркеты',
        'Развлечения',
        'Здоровье',
        'Учёба',
        'Боль',
    ];

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }
}
