import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
import {OrderComponent} from './views/order/order/order.component';

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
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'order',
                loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
                data: {title: 'Order'}
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

