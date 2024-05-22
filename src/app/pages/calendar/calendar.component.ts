import { Component } from '@angular/core';
import { UICalendarComponent } from '../../components/calendar/calendar component/ui.calendar.component';
import { HeaderNavigationComponent } from '../../components/header-navigation/header-navigation.component';
import { SlideoutMenuComponent } from '../../components/calendar/slideout-menu/slideout-menu.component';
import { DashboardMenuComponent } from '../../components/dashboard-menu/dashboard-menu.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [UICalendarComponent, HeaderNavigationComponent, SlideoutMenuComponent, DashboardMenuComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
