import { Component } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'UI-calendar',
  standalone: true,
  imports: [DayComponent,CommonModule],
  templateUrl: './ui.calendar.component.html',
  styleUrl: './ui.calendar.component.scss'
})
export class UICalendarComponent {
  days: number[] =  Array.from({length: 30}, (_, i) => i + 1);
  names: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
}
