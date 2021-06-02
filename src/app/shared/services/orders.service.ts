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
        return this.http.get(`/api/order/all?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    getAllOrdersByCompany(): Observable<any> {
        return this.http.get(`/api/order/allByCompany?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    getAllOrdersByCompanyInactive(): Observable<any> {
        return this.http.get(`/api/order/allByCompanyFinished?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    getOrderById(id: number): Observable<any> {
        return this.http.get(`/api/order/${id}`, {observe: 'response'});
    }

    setWorked(id: number, moverId: number): Observable<any> {
        return this.http.post(`/api/order/setWorked?id=${id}&moverId=${moverId}`, {observe: 'response'});
    }

    setFinish(id: number) {
        return this.http.post(`/api/order/finishByManager?id=${id}&username=${this.authService.getUsername()}`, {observe: 'response'});
    }
}
