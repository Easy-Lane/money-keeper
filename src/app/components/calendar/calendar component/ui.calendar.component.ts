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

  todayDate = new Date();
  names: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = this.todayDate.getMonth();
  currentYear: number = this.todayDate.getFullYear();
  lastDays: number[] = Array.from({length: new Date(this.currentYear, this.currentMonth, 0).getDay()});
  days: number[] = Array.from({length: new Date(this.currentYear, this.currentMonth + 1, 0).getDate()}, (_, i) => i + 1);
  
  public changeMonth(diff: number):void {
      this.currentMonth += diff
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } 
      else if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } 

      this.days = Array.from({length: new Date(this.currentYear, this.currentMonth + 1, 0).getDate()}, (_, i) => i + 1);
      this.lastDays = Array.from({length: new Date(this.currentYear, this.currentMonth, 0).getDay()});
  }
}
