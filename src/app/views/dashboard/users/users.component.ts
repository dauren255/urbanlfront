import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {OrdersService} from '../../../shared/services/orders.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {UsersService} from '../../../shared/services/users.service';
import {Mover} from '../../../shared/models/mover.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'moverName', 'carName', 'carData', 'carNumber', 'status'];
    movers: MatTableDataSource<Mover>;

    paginator: MatPaginator;

    constructor(
        private userService: UsersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService
    ) {
    }

    ngAfterViewInit() {
        this.appLoader.open();
        this.userService.getAllMovers().subscribe(res => {
                this.movers = new MatTableDataSource<Mover>(res.body.data);
                console.log(res.body.data);
                this.movers.paginator = this.paginator;
                this.appLoader.close();
            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
                this.appLoader.close();
            }
        );
    }
}
