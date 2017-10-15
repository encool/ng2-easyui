import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ActivatedRoute,
    CanActivateChild
} from '@angular/router';

import { EuTabService } from "./eu-tab.service";
import { EuMatTab } from "./mat-container.component";

@Injectable()
export class TitleGuard implements CanActivate, CanActivateChild {

    constructor(private euTabService: EuTabService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // debugger
        // let p = route.params
        if (route.component) {
            let url: string = state.url;
            let urls = url.split(";")

            let data = route.data
            let params = route.params
            if (data && data.title) {
                let tab: EuMatTab = {
                    label: data.title,
                    path: [urls[0],params]
                }
                this.euTabService.addEuMatTab(tab)
            }
        }
        return true
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    // setBreadcrumbArray(target: Menu, menus: Array<Menu>): boolean {
    //     for (let m in menus) {
    //         let menu: Menu = menus[m]
    //         this.menuService.breadcrumbArray.push(menu)
    //         //get it
    //         if (menu.l == target.l) {
    //             return true
    //         } else if (menu.c && menu.c.length > 0) { //查詢咨菜單
    //             let isInChildren = this.setBreadcrumbArray(target, menu.c)
    //             if (isInChildren) {
    //                 return true
    //             } else {
    //                 this.menuService.breadcrumbArray.pop()
    //             }
    //         } else { //出棧
    //             this.menuService.breadcrumbArray.pop()
    //         }
    //     }
    //     menus.forEach(i => {

    //     })
    // }
}
