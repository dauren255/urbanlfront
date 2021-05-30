import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartsModule} from 'ng2-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedPipesModule} from 'app/shared/pipes/shared-pipes.module';

import {DashboardRoutes} from './dashboard.routing';
import {DefaultDashboardComponent} from './default-dashboard/default-dashboard.component';
import {OrdersComponent} from './orders/orders.component';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UsersService} from '../../shared/services/users.service';
import {UsersComponent} from './users/users.component';
import {OrdersService} from '../../shared/services/orders.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../../shared/helpers/TokenInterceptor';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FinishOrdersComponent } from './finish-orders/finish-orders.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatButtonModule,
        MatChipsModule,
        MatListModule,
        MatTabsModule,
        MatTableModule,
        MatGridListModule,
        FlexLayoutModule,
        ChartsModule,
        NgxEchartsModule,
        NgxDatatableModule,
        SharedPipesModule,
        RouterModule.forChild(DashboardRoutes),
        MatPaginatorModule
    ],
    declarations: [
        DefaultDashboardComponent,
        OrdersComponent,
        UsersComponent,
        AllOrdersComponent,
        FinishOrdersComponent],
    exports: [],
    providers: [
        UsersService,
        OrdersService
    ]
})
export class DashboardModule {

}
