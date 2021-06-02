import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../../shared/models/order.model';
import {OrdersService} from '../../../shared/services/orders.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {Company} from '../../../shared/models/company.model';
import {User} from '../../../shared/models/user.model';
import {Location} from '../../../shared/models/location.model';
import {Mover} from '../../../shared/models/mover.model';
import {UsersService} from '../../../shared/services/users.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    order = new Order;
    company = new Company;
    mover = new Mover;
    movers: Mover[];
    moverUser = new User;
    user = new User;
    arrival = new Location;
    destination = new Location;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private orderService: OrdersService,
        private userService: UsersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService,
        public dialog: MatDialog,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.appLoader.open();
        const routeParams = this.route.snapshot.paramMap;
        this.id = Number(routeParams.get('orderId'));
        this.orderService.getOrderById(this.id).subscribe(res => {
            this.order = res.body.data;
            this.company = res.body.data.company;
            this.mover = res.body.data.mover;
            if (this.mover != null) {
                this.moverUser = this.mover.user;
            }
            this.user = res.body.data.user;
            this.arrival = res.body.data.arrivalPlace;
            this.destination = res.body.data.destinationPlace;
            this.appLoader.close();
        }, error => {
            this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
            this.appLoader.close();
        });

        // Find the product that correspond with the id provided in route.
        // this.product = products.find(product => product.id === productIdFromRoute);
    }

    openDialog() {
        this.dialog.open(DialogOrderSetWorker, {
            data: this.order,
        });
    }

    setFinish() {
        this.orderService.setFinish(this.order.id)
            .subscribe(res => {
                this.appConfirm.confirm({title: 'Внимание', message: 'Заказу окончен'});
                this.router.navigate(['/dashboard/allOrders']);

            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
                this.appLoader.close();
            });
    }
}

@Component({
    selector: 'dialog-order-set-worker',
    templateUrl: 'dialog-order-set-worker.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOrderSetWorker implements OnInit {

    movers: Mover[];
    selectedValue = new Mover;

    constructor(
        public authService: AuthenticationService,
        public dialogRef: MatDialogRef<DialogOrderSetWorker>,
        @Inject(MAT_DIALOG_DATA) public data: Order,
        private route: ActivatedRoute,
        private orderService: OrdersService,
        private userService: UsersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.userService.getAllActiveMovers().subscribe(res => {
            this.movers = res.body.data;
            this.appLoader.close();
        }, error => {
            this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
            this.appLoader.close();
        });
    }

    setWorked(moverId: number) {
        this.appLoader.open();
        this.orderService.setWorked(this.data.id, moverId).subscribe(res => {
            this.appConfirm.confirm({title: 'Внимание', message: 'Заказу дан водитель'});
            this.appLoader.close();
            this.dialogRef.close();
            this.router.navigate(['/dashboard/allOrders']);
        }, error => {
            this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
            this.appLoader.close();
        });
    }
}


