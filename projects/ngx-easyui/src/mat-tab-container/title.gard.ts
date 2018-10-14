import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

import { EuTabService } from "./eu-tab.service";
import { EuMatTab } from "./mat-container.component";
import { EuMenuService } from "ngx-easyui-core";

@Injectable()
export class TitleGuard implements CanActivate, CanActivateChild {

    constructor(
        private euTabService: EuTabService,
        private euMenuService: EuMenuService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // debugger
        // let p = route.params
        if (route.component) {
            let url: string = state.url;
            let urls = url.split(";")
            // let needParams: boolean = urls.length == 1 ? false : true
            let data = route.data
            let params = route.params
            let queryParams = route.queryParams
            if (data && data.title) {
                let tab: EuMatTab = {
                    fullPath: url,
                    label: data.title,
                    path: [urls[0], params],
                    queryParams: queryParams
                }
                this.euTabService.addEuMatTab(tab)
                this.euMenuService
                // this.euTabService.addMenu()
            }
        }
        return true
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

}
