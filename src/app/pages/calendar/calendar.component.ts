import { Component } from '@angular/core';
import { UICalendarComponent } from '../../components/calendar/calendar component/ui.calendar.component';
import { DayComponent } from '../../components/calendar/day/day.component';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
import { SlideoutMenuComponent } from '../../components/calendar/slideout-menu/slideout-menu.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [UICalendarComponent, HeaderNavigationComponent, SlideoutMenuComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
