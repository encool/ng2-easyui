import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from "@angular/material";

import {
    MatContainerComponent, EuMatTab
} from '../../widget'
// } from 'ng2-easyui'
import { Menu } from "ng2-easyui.core";

@Component({
    selector: 'demo-index',
    templateUrl: "./index.component.html"
})
export class IndexComponent implements OnInit {

    menus: Menu[] = [
        {
            id: "1",
            t: "feature",
            i: "",
            c: [
                {
                    id: "1",
                    t: "demo",
                    i: "",
                    c: [
                        {
                            id: "1",
                            t: "aggrid",
                            l: "/demo/EuAggridDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "Bpmn2Demo",
                            l: "Bpmn2Demo/Bpmn2DemoComponent",
                            i: "",
                        },
                    ]
                },
                {
                    id: "1",
                    t: "demo",
                    i: "",
                    c: [
                        {
                            id: "1",
                            t: "matpanel",
                            l: "/MatPanelDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "ng2Tree",
                            l: "/Ng2TreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "antdTree",
                            l: "/AntdTreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "SelectTree",
                            l: "/SelectTreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "SelectTreeForm",
                            l: "/SelectTreeFormComponent",
                            i: "",
                        },
                    ]
                },
            ]
        },
        {
            id: "1",
            t: "level1",
            i: "",
            c: [
                {
                    id: "1",
                    t: "level2",
                    l: "ddd",
                    i: "",
                },
                {
                    id: "1",
                    t: "demo",
                    l: "ddd",
                    i: "",
                },
            ]
        },
        {
            id: "1",
            t: "系统设置",
            l: "ddd",
            i: "",
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

    srcMenus = [{ id: "1", t: "11", l: "", i: "" }]
    ngOnInit() {
        this.container.breadcrumbMenus = this.srcMenus
    }

    isSideBySide = true
    get mode() {
        return this.isSideBySide ? 'side' : 'over';
    }

    onHideMenu() {
        debugger
        this.srcMenus = []
        // this.container.breadcrumbMenus = []
        this.sideNav.close()
    }

    openedChange: EventEmitter<any> = new EventEmitter<any>();
    onSideChanged(e) {
        this.openedChange.emit()
    }
}