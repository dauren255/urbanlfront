import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UsersService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {
    }

    getAllMovers(): Observable<any> {
        return this.http.get(`/api/user/allMoverByCompany?username=${this.authService.getUsername()}`, {observe: 'response'});
    }
}
