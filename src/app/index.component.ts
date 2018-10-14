import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from "@angular/material";

import {
    MatContainerComponent, EuMatTab
    // } from '../../widget'
} from 'ngx-easyui'
import { Menu, EuMenuService } from "ngx-easyui-core";

@Component({
    selector: 'demo-index',
    templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {

    userDTO = {
        userRealname: "测试用户"
    }

    indexTab: EuMatTab = {
        path: ["/EntryComponent"],
        fullPath: "/EntryComponent",
        label: "首页"
    }

    @ViewChild(MatContainerComponent) container: MatContainerComponent
    @ViewChild(MatSidenav) sideNav: MatSidenav

    constructor(public menuService: EuMenuService) {

    }

    srcMenus = [{ id: "1", t: "11", l: "", i: "" }]
    ngOnInit() {
        this.container.breadcrumbMenus = this.srcMenus
    }

    isSideBySide = true
    get mode() {
        return this.isSideBySide ? 'side' : 'over';
    }

    onHideMenu() {
        this.srcMenus = []
        // this.container.breadcrumbMenus = []
        this.sideNav.close()
    }

    openedChange: EventEmitter<any> = new EventEmitter<any>();
    onSideChanged(e) {
        this.openedChange.emit()
    }
}