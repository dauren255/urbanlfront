import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {egretAnimations} from '../../../shared/animations/egret-animations';
import {AuthenticationService} from '../../../shared/services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppLoaderService} from '../../../shared/services/app-loader/app-loader.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-signin4',
    templateUrl: './signin4.component.html',
    styleUrls: ['./signin4.component.scss'],
    animations: egretAnimations
})
export class Signin4Component implements OnInit {

    signInForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthenticationService,
        private appLoader: AppLoaderService) {
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.signInForm = this.fb.group({
                username: ['', Validators.required],
                password: ['', Validators.required]
            }
        );
        this.returnUrl = this.route.snapshot.queryParams['/dashboard/default'] || '/';
    }

    get f() {
        return this.signInForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.signInForm.invalid) {
            console.log('error');
            return;
        }

        this.authService.login(this.f.username.value, this.f.password.value);

    }

}
