import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    {
        path: 'welcome',
        pathMatch: 'full',
        //component: WelcomePageComponent
        loadComponent: () =>
            import('./pages/welcome-page/welcome-page.component').then(
                (m) => m.WelcomePageComponent
            ),
    },
    {
        path: 'home',
        children: [
            {
                path: 'calendar',
                loadComponent: () =>
                    import('./pages/calendar/calendar.component').then(
                        (m) => m.CalendarComponent
                    ),
            },
            {
                path: 'user-profile',
                loadComponent: () =>
                    import('./pages/user-profile/user-profile.component').then(
                        (m) => m.UserProfileComponent
                    ),
            },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent
                    ),
                data: {
                    breadcrumb: 'Dashboard',
                },
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import(
                                './pages/dashboard/childs/dashboard-page/dashboard-page.component'
                            ).then((m) => m.DashboardPageComponent),
                    },
                    {
                        path: 'pie-chart',
                        loadComponent: () =>
                            import(
                                './pages/dashboard/childs/pie-chart-page/pie-chart-page.component'
                            ).then((m) => m.PieChartPageComponent),
                        data: {
                            breadcrumb: 'Expenses category',
                        },
                    },
                    {
                        path: 'line-chart',
                        loadComponent: () =>
                            import(
                                './pages/dashboard/childs/line-chart-page/line-chart-page.component'
                            ).then((m) => m.LineChartPageComponent),
                        data: {
                            breadcrumb: 'Line-Chart',
                        },
                    },
                ],
            },
        ],
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '/welcome' }
];
