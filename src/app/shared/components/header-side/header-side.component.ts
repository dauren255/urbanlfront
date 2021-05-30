import {Component, OnInit, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header-side',
    templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
    @Input() notificPanel;

    public egretThemes;
    public layoutConf: any;

    constructor(
        private router: Router,
        private themeService: ThemeService,
        private layout: LayoutService,
        public translate: TranslateService,
        private renderer: Renderer2,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.egretThemes = this.themeService.egretThemes;
        this.layoutConf = this.layout.layoutConf;
    }

    changeTheme(theme) {
        // this.themeService.changeTheme(theme);
    }

    toggleNotific() {
        this.notificPanel.toggle();
    }

    toggleSidenav() {
        if (this.layoutConf.sidebarStyle === 'closed') {
            return this.layout.publishLayoutChange({
                sidebarStyle: 'full'
            });
        }
        this.layout.publishLayoutChange({
            sidebarStyle: 'closed'
        });
    }

    toggleCollapse() {
        // compact --> full
        if (this.layoutConf.sidebarStyle === 'compact') {
            return this.layout.publishLayoutChange({
                sidebarStyle: 'full',
                sidebarCompactToggle: false
            }, {transitionClass: true});
        }

        // * --> compact
        this.layout.publishLayoutChange({
            sidebarStyle: 'compact',
            sidebarCompactToggle: true
        }, {transitionClass: true});

    }

    onSearch(e) {
        //   console.log(e)
    }

    logout() {
        this.authService.logout();
    }
}
