import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
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
                    import(
                        './pages/dashboard-page/dashboard-page.component'
                    ).then((m) => m.DashboardPageComponent),
                data: {
                    breadcrumb: 'Dashboard',
                },
                children: [
                    {
                        path: 'pie-chart',
                        loadComponent: () =>
                            import(
                                './pages/pie-chart-page/pie-chart-page.component'
                            ).then((m) => m.PieChartPageComponent),
                        data: {
                            breadcrumb: 'Pie-Chart',
                        },
                    },
                    {
                        path: 'line-chart',
                        loadComponent: () =>
                            import(
                                './pages/line-chart-page/line-chart-page.component'
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
];
