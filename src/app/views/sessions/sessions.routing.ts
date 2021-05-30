import {Signup4Component} from './signup4/signup4.component';
import {Routes} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {Signin4Component} from './signin4/signin4.component';

export const SessionsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'signup4',
                component: Signup4Component,
                data: {title: 'Signup4'}
            },
            {
                path: 'signin4',
                component: Signin4Component,
                data: {title: 'Signin4'}
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: {title: 'Forgot password'}
            },
            {
                path: 'lockscreen',
                component: LockscreenComponent,
                data: {title: 'Lockscreen'}
            },
            {
                path: '404',
                component: NotFoundComponent,
                data: {title: 'Not Found'}
            },
            {
                path: 'error',
                component: ErrorComponent,
                data: {title: 'Error'}
            }
        ]
    }
];
