import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TuiAxesModule, TuiLineChartModule} from '@taiga-ui/addon-charts';
import {TuiContextWithImplicit, TuiStringHandler} from '@taiga-ui/cdk';
import {TuiPoint} from '@taiga-ui/core';
import {ChartsButtonComponent} from '../charts-button/charts-button.component';
import {SkeletonComponent} from "../../skeleton/skeleton.component";

@Component({
    selector: 'line-chart',
    standalone: true,
    imports: [
        TuiLineChartModule,
        TuiAxesModule,
        CommonModule,
        ChartsButtonComponent,
        SkeletonComponent,
    ],
    templateUrl: './line-chart.component.html',
    styleUrl: './styles/line-chart.master.scss',
})
export class LineChartComponent implements OnInit {
    public contentLoaded: boolean = false;
    readonly title: string = 'График за 3 месяца';
    readonly encomes: string = 'Доход';
    readonly expences: string = 'Убытки';
    readonly values: TuiPoint[][] = [
        [
            [0, 350],
            [200, 150],
            [400, 275],
            [600, 350],
        ],
        [
            [0, 50],
            [200, 390],
            [400, 260],
            [600, 90],
        ],
    ];

    public ngOnInit(): void {
        setTimeout((): void => {
            this.contentLoaded = true;
        }, 2000);
    }

    readonly hint: TuiStringHandler<TuiContextWithImplicit<readonly TuiPoint[]>> =
        ({$implicit}) =>
            `${$implicit[0][0]} items:\n\n${$implicit
                .map(([_, y]) => y)
                .join('$\n')}$`;
}
