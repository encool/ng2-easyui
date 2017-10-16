import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { EuTabService } from "./eu-tab.service";

@Component({
    selector: 'eu-mat-container',
    templateUrl: 'mat-container.component.html',
    styleUrls: ["mat-container.component.css"]
})
export class MatContainerComponent implements OnInit {


    @Input() indexTab: EuMatTab = {
        path: ["/"],
        fullPath: "/",
        label: "首页",
    }

    @ViewChild(RouterLink) routerLink: RouterLink
    @ViewChild(RouterLinkActive) routerLinkActive: RouterLinkActive

    constructor(private router: Router, private euTabService: EuTabService) {

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