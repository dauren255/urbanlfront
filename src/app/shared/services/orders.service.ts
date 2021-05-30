import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class OrdersService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {

    }

    getAllOrders(): Observable<any> {
        return this.http.get(`/api/order/all`, {observe: 'response'});
    }

    getAllOrdersByCompany(): Observable<any> {
        return this.http.get(`/api/order/allByCompany?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    getAllOrdersByCompanyInactive(): Observable<any> {
        return this.http.get(`/api/order/allByCompanyInactive?username=${this.authService.getUsername()}`, {observe: 'response'});
    }
}
