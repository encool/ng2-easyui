import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material";

import { MatContainerComponent, EuMatTab, Menu } from '../../'

@Component({
    selector: 'demo-index',
    templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {

    menus: Menu[] = [
        {
            id: "1",
            title: "feature",
            icon: "",
            children: [
                {
                    id: "1",
                    title: "demo",
                    icon: "",
                    children: [
                        {
                            id: "1",
                            title: "aggrid",
                            link: "/demo/EuAggridDemoComponent",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "系统设置",
                            link: "ddd",
                            icon: "",
                        },
                    ]
                },
                {
                    id: "1",
                    title: "系统设置",
                    link: "ddd",
                    icon: "",
                    children: [
                        {
                            id: "1",
                            title: "系统设置",
                            link: "ddd",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "系统设置",
                            link: "ddd",
                            icon: "",
                        },
                    ]
                },
            ]
        },
        {
            id: "1",
            title: "系统设置",
            link: "ddd",
            icon: "",
            children: [
                {
                    id: "1",
                    title: "系统设置",
                    link: "ddd",
                    icon: "",
                },
                {
                    id: "1",
                    title: "系统设置",
                    link: "ddd",
                    icon: "",
                },
            ]
        },
        {
            id: "1",
            title: "系统设置",
            link: "ddd",
            icon: "",
        },
    ]

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

    constructor() { }

    ngOnInit() {

    }

    onHideMenu() {
        this.sideNav.close()
    }

}