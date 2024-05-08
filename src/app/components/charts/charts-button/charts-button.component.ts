import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'charts-button',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './charts-button.component.html',
  styleUrl: './styles/charts-button.master.scss',
})
export class ChartsButtonComponent {
  public label: string = 'Изучить';
}
