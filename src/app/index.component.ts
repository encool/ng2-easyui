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
            t: "menu1",
            l: "ddd",
            i: "",
            c: [
                {
                    id: "1",
                    t: "menu1",
                    l: "ddd",
                    i: ""
                },
                {
                    id: "1",
                    t: "menu1",
                    l: "ddd",
                    i: ""
                },
            ]
        },
        {
            id: "1",
            t: "menu1",
            l: "ddd",
            i: ""
        },
        {
            id: "1",
            t: "menu1",
            l: "ddd",
            i: ""
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