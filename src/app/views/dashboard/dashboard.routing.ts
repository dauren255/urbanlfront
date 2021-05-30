import {Routes} from '@angular/router';


import {DefaultDashboardComponent} from './default-dashboard/default-dashboard.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {AllOrdersComponent} from './all-orders/all-orders.component';
import {FinishOrdersComponent} from './finish-orders/finish-orders.component';

export const DashboardRoutes: Routes = [
    {
        path: 'default',
        component: DefaultDashboardComponent,
        data: {title: 'Default', breadcrumb: 'Default'}
    },
    {
        path: 'allOrders',
        component: AllOrdersComponent,
        data: {title: 'All Orders', breadcrumb: 'All Orders'}
    },
    {
        path: 'orders',
        component: OrdersComponent,
        data: {title: 'Our Orders', breadcrumb: 'Our Orders'}
    },
    {
        path: 'finishOrders',
        component: FinishOrdersComponent,
        data: {title: 'Finish Orders', breadcrumb: 'Finish Orders'}
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {title: 'Users', breadcrumb: 'Users'}
    }

];
