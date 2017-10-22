import { Component, OnInit, ViewChild } from '@angular/core';

import { MatContainerComponent, EuMatTab, Menu } from '../../'

@Component({
    selector: 'demo-index',
    templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {

    menus: Menu[] = [
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

    constructor() { }

    ngOnInit() {

    }

    tabadd() {
        debugger
    }
}