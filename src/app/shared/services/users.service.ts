import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {Mover} from '../models/mover.model';

@Injectable()
export class UsersService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {
    }

    getAllMovers(): Observable<any> {
        return this.http.get(`/api/mover/allMoverByCompany?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    getAllActiveMovers(): Observable<any> {
        return this.http.get(`/api/mover/allActiveMoverByCompany?username=${this.authService.getUsername()}`, {observe: 'response'});
    }

    createMover(mover: Mover): Observable<any> {
        return this.http.post(`/api/mover/createMover?username=${this.authService.getUsername()}`, {mover}, {observe: 'response'});
    }

    getCompany(): Observable<any> {
        return this.http.get(`/api/user/company?username=${this.authService.getUsername()}`, {observe: 'response'});
    }


}
