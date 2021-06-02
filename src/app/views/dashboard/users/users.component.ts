import {AfterViewInit, Component, OnInit, Inject} from '@angular/core';
import {Order} from '../../../shared/models/order.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {OrdersService} from '../../../shared/services/orders.service';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';
import {UsersService} from '../../../shared/services/users.service';
import {Mover} from '../../../shared/models/mover.model';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../../shared/models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'moverName', 'carName', 'carData', 'carNumber', 'status', 'driverLicense'];
    movers: MatTableDataSource<Mover>;

    paginator: MatPaginator;

    constructor(
        private userService: UsersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService,
        public dialog: MatDialog,
    ) {
    }

    ngAfterViewInit() {
        this.appLoader.open();
        this.userService.getAllMovers().subscribe(res => {
                this.movers = new MatTableDataSource<Mover>(res.body.data);
                this.movers.paginator = this.paginator;
                this.appLoader.close();
            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
                this.appLoader.close();
            }
        );
    }

    addMover() {
        this.dialog.open(DialogAddMover);
    }
}

@Component({
    selector: 'dialog-add-mover',
    templateUrl: 'dialog-add-mover.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogAddMover implements OnInit {

    name = new FormControl('');
    surname = new FormControl('');
    carName = new FormControl('');
    carNumber = new FormControl('');
    carData = new FormControl('');
    driverLicense = new FormControl('');
    username = new FormControl('');
    password = new FormControl('');
    phoneNumber = new FormControl('');
    user = new User;
    mover = new Mover;
    check = false;

    constructor(
        public authService: AuthenticationService,
        public dialogRef: MatDialogRef<DialogAddMover>,
        @Inject(MAT_DIALOG_DATA) public data: Order,
        private orderService: OrdersService,
        private userService: UsersService,
        private appLoader: AppLoaderService,
        private appConfirm: AppConfirmService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.userService.getCompany().subscribe(
            res => {
                this.user.company = res.body.data;
            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
            }
        );
    }

    createMover() {

        if (this.name.hasError('required')) {
            this.check = true;
        }
        if (this.surname.hasError('required')) {
            this.check = true;
        }
        if (this.carName.hasError('required')) {
            this.check = true;
        }
        if (this.carNumber.hasError('required')) {
            this.check = true;
        }
        if (this.carData.hasError('required')) {
            this.check = true;
        }
        if (this.driverLicense.hasError('required')) {
            this.check = true;
        }
        if (this.username.hasError('required')) {
            this.check = true;
        }
        if (this.password.hasError('required')) {
            this.check = true;
        }
        if (this.phoneNumber.hasError('required')) {
            this.check = true;
        }
        this.appLoader.open();
        this.resolveAfter2Seconds(20).then(data1 => {
            this.userService.createMover(this.mover).subscribe(res => {
                this.appConfirm.confirm({title: 'Внимание ', message: 'Водитель добавлен'});
                this.appLoader.close();
                this.dialogRef.close();
                this.router.navigate(['/dashboard/users']);
                console.log(res.body.data);
            }, error => {
                this.appConfirm.confirm({title: 'Error ', message: 'Something went wrong'});
                this.appLoader.close();
            });
        });
    }

    resolveAfter2Seconds(x) {
        this.setFields();
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    }

    setFields(): boolean {
        this.user.surname = this.surname.value;
        this.user.username = this.username.value;
        this.user.password = this.password.value;
        this.user.phoneNumber = this.phoneNumber.value;
        this.mover.carName = this.carName.value;
        this.mover.carData = this.carData.value;
        this.mover.carNumber = this.carNumber.value;
        this.mover.user = this.user;
        return true;
    }
}


