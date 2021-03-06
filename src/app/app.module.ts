import {NgModule, ErrorHandler} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig} from '@angular/material';
import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';


import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/inmemory-db/inmemory-db.service';

import {rootRouterConfig} from './app.routing';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorHandlerService} from './shared/services/error-handler.service';
import {TokenInterceptor} from './shared/helpers/TokenInterceptor';
import {ErrorInterceptor} from './shared/helpers/ErrorInterceptor';
import {DatePipe} from '@angular/common';
import {DialogOrderSetWorker} from './views/order/order/order.component';
import {MatSelectModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {OrdersService} from './shared/services/orders.service';
import {UsersService} from './shared/services/users.service';
import {DialogAddMover} from './views/dashboard/users/users.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        PerfectScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
        RouterModule.forRoot(rootRouterConfig, {useHash: false}),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        DialogOrderSetWorker,
        DialogAddMover
    ],
    providers: [
        DatePipe,
        {provide: ErrorHandler, useClass: ErrorHandlerService},
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        OrdersService,
        UsersService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogOrderSetWorker,
        DialogAddMover
    ],
})
export class AppModule {
}
