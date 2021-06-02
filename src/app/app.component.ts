import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

import {RoutePartsService} from './shared/services/route-parts.service';

import {filter} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './shared/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    appTitle = 'UrbanLogistics';
    pageTitle = '';

    constructor(
        public title: Title,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthenticationService,
        public http: HttpClient
    ) {
    }

    ngOnInit() {
        this.changePageTitle();
        // this.layout.applyMatTheme(this.renderer)
        this.connectServer();
    }

    ngAfterViewInit() {
    }

    public connectServer() {
        if (null != this.authService.getUsername()) {
            this.http.get(`/api/user/check?username=${this.authService.getUsername()}`)
                .subscribe(
                    data => console.log(data),
                    err => console.log(err),
                );
        }
    }

    changePageTitle() {
        // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
        //     var routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        //     if (!routeParts.length) {
        //         return this.title.setTitle(this.appTitle);
        //     }
        //     // Extract title from parts;
        //     this.pageTitle = routeParts
        //         .reverse()
        //         .map((part) => part.title)
        //         .reduce((partA, partI) => {
        //             return `${partA} > ${partI}`;
        //         });
        //     this.pageTitle += ` | ${this.appTitle}`;
        //     this.title.setTitle(this.pageTitle);
        // });
    }

}
