import {Inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    public authToken;
    private isAuthenticated = true; // Set this value dynamically
    currentUser: any;

    constructor(
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        this.router.navigate(['/sessions/signin4']);
        return false;
    }
}
