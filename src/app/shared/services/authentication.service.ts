import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppLoaderService} from './app-loader/app-loader.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {UserRole} from '../models/user.role.model';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient,
                private appLoader: AppLoaderService,
                private router: Router) {
    }

    login(username, password) {
        this.appLoader.open();
        return this.http.post<any>(`/api/auth`, {username, password}, {observe: 'response'})
            .subscribe(user => {
                localStorage.setItem('currentUser', user.headers.get('Authorization').substring(7));
                this.router.navigate(['/dashboard/default']);
                this.appLoader.close();
            }, error => {
                this.appLoader.close();
            });
    }

    // public isAuthenticated(): boolean {
    //     // get the token
    //     const token = this.getToken();
    //     // return a boolean indicating whether or not the token is expired
    //     return tokenNotExpired(token);
    // }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/sessions/signin4']);
    }

    public getToken(): string {
        return localStorage.getItem('currentUser');
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    public getUsername(): string {
        return this.getDecodedAccessToken(this.getToken()).sub;
    }

    public getRoles(): UserRole[] {
        return this.getDecodedAccessToken(this.getToken()).authorities;
    }

    public isAdmin(): boolean {
        // @ts-ignore
        return this.getRoles().includes('ADMIN');
    }
    public isUser(): boolean {
        // @ts-ignore
        return this.getRoles().includes('USER');
    }
}
