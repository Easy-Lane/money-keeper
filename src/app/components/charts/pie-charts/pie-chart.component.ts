import { Component, NgModule } from '@angular/core';
import { ChartsButtonComponent } from '../charts-button/charts-button.component';
import { TuiPieChartModule } from '@taiga-ui/addon-charts';
import { CommonModule } from '@angular/common';
import { TuiSizeXL, TuiSizeXS } from '@taiga-ui/core';
import { LetDirective } from '../../../directives/let.directive';

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [
    ChartsButtonComponent,
    TuiPieChartModule,
    CommonModule,
    LetDirective,
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
    'XD',
  ];

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }
}
