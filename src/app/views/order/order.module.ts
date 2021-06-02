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

import {OrderRouting} from './order.routing';
import {OrderComponent} from './order/order.component';
import {OrdersService} from '../../shared/services/orders.service';
import {UsersService} from '../../shared/services/users.service';

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
        RouterModule.forChild(OrderRouting)
    ],
    declarations: [
        OrderComponent
    ],
    exports: [],
    providers: [
        UsersService,
        OrdersService
    ],
    entryComponents: [
    ],
})
export class OrderModule {

}
