import { Routes ,RouterModule} from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
export const routes: Routes = [
  { 
    path: '', 
    component: WelcomePageComponent
    //loadChildren: () => import("./pages/welcome-page/welcome-page.component").then(m => m.WelcomePageComponent)
  },
  { path: 'home', children: [
    { path: 'calendar', component: CalendarComponent
    //loadChildren: () => import("./pages/calendar/calendar.component").then(m => m.CalendarComponent) 
    }
    //{ path: 'calendar', component: CalendarComponent }
  ],
    canActivate: [AuthGuard]
  }
];
