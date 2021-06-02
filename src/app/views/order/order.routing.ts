import {Routes} from '@angular/router';
import {OrderComponent} from './order/order.component';

export const OrderRouting: Routes = [
    {
        path: ':orderId' ,
        component: OrderComponent,
        data: {title: 'Order', breadcrumb: 'Order'}
    }
];
