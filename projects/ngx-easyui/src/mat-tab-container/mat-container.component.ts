import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, UrlTree, NavigationEnd } from "@angular/router";

import { EuTabService } from "./eu-tab.service";

import { containsTree } from "./angular/url_tree";

import { Menu, EuMenuService } from "ngx-easyui-core";

@Component({
    selector: 'eu-mat-container',
    templateUrl: 'mat-container.component.html',
    styleUrls: ["mat-container.component.css"]
})
export class MatContainerComponent implements OnInit {

    @Input() model: 'tab' | 'breadcrumb' = 'breadcrumb'

    @Input() indexTab: EuMatTab = {
        path: ["/"],
        fullPath: "/",
        label: "首页",
    }
    @Input() indexMenu: Menu = {
        id: "id",
        l: "/",
        t: "首页",
        i: ""
    }

    @ViewChild(RouterLink) routerLink: RouterLink
    @ViewChild(RouterLinkActive) routerLinkActive: RouterLinkActive

    breadcrumbMenus: Menu[]

    constructor(private router: Router, public euTabService: EuTabService, private euMenuService: EuMenuService) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbMenus = []
                this.breadcrumbMenus.push(this.indexMenu)
                let done = this.setBreadcrumbMenus({ l: event.url } as any, this.euMenuService.appMenus)
                if (!done) {

                }
            }
        })
    }

    ngOnInit() {
        // debugger
        this.euTabService.init(this.indexTab)
        this.routerLink
        this.routerLinkActive
        this.router
    }

    setBreadcrumbMenus(target: Menu, menus: Array<Menu>): boolean {
        for (let m in menus) {
            let menu: Menu = menus[m]
            this.breadcrumbMenus.push(menu)
            //get it
            if (menu.l == target.l || '/' + menu.l == target.l) {
                return true
            } else if (menu.c && menu.c.length > 0) { //查詢咨菜單
                let isInChildren = this.setBreadcrumbMenus(target, menu.c)
                if (isInChildren) {
                    return true
                } else {
                    this.breadcrumbMenus.pop()
                }
            } else { //出棧
                this.breadcrumbMenus.pop()
            }
        }
        return false;
    }

    tabClose(tab: EuMatTab) {
        this.euTabService.removeTab(tab)
    }

    isActive(tab: EuMatTab) {
        // debugger
        let urlTree: UrlTree = this.router.parseUrl(tab.fullPath)
        return containsTree((this.router as any).currentUrlTree, urlTree as any, true)
        // return this.router.isActive(tab.fullPath, true);
    }
}

export interface EuMatTab {
    isIndex?: boolean
    hash?: string
    path: any[]
    fullPath: string
    params?: any
    queryParams?: any
    label: string
}