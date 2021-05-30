import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/services/auth/auth.guard';
import {DefaultDashboardComponent} from './views/dashboard/default-dashboard/default-dashboard.component';

export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sessions',
                loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
                data: {title: 'Session'}
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {title: 'Dashboard'}
            }

        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

