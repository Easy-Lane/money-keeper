import { Component } from '@angular/core';
import { UICalendarComponent } from '../../components/calendar/calendar component/ui.calendar.component';
import { DayComponent } from '../../components/calendar/day/day.component';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [UICalendarComponent, DayComponent, HeaderNavigationComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
