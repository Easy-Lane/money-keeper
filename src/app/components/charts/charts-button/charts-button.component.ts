import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FocusDirective } from '../../../directives/focus.directive';

@Component({
  selector: 'charts-button',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FocusDirective],
  templateUrl: './charts-button.component.html',
  styleUrl: './styles/charts-button.master.scss',
})
export class ChartsButtonComponent {
  public label: string = 'Изучить';
}
