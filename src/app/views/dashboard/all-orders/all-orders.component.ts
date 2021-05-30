import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Order} from '../../../shared/models/order.model';
import {OrdersService} from '../../../shared/services/orders.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';

@Component({
    selector: 'app-all-orders',
    templateUrl: './all-orders.component.html',
    styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'moverName', 'userName', 'startDate',
        'endDate', 'arrivalPlace', 'destinationPlace', 'status', 'rating'];
    orders: MatTableDataSource<Order>;

    paginator: MatPaginator;

    constructor(
        private ordersService: OrdersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService) {
    }

    ngAfterViewInit() {
        this.appLoader.open();
        this.ordersService.getAllOrders().subscribe(res => {
                this.orders = new MatTableDataSource<Order>(res.body.data);
                this.orders.paginator = this.paginator;
                this.appLoader.close();
            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
                this.appLoader.close();
            }
        );
    }


}
