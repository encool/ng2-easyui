import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, UrlTree, UrlSegmentGroup } from "@angular/router";

import { EuTabService } from "./eu-tab.service";

import { containsTree } from "./angular/url_tree";

import { Menu } from "ng2-easyui.core";

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

    @ViewChild(RouterLink) routerLink: RouterLink
    @ViewChild(RouterLinkActive) routerLinkActive: RouterLinkActive

    @Input() breadcrumbMenus: Menu[] = [new Menu({ id: "$dkiesdf", i: "1", t: "首页", l: "index" })]

    constructor(private router: Router, public euTabService: EuTabService) {

    }

    ngOnInit() {
        // debugger
        this.euTabService.init(this.indexTab)
        this.routerLink
        this.routerLinkActive
        this.router
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