import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatSidenav } from "@angular/material";

import {
    MatContainerComponent, EuMatTab, Menu
} from '../../widget'
// } from 'ng2-easyui'

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
                            title: "Bpmn2Demo",
                            link: "Bpmn2Demo/Bpmn2DemoComponent",
                            icon: "",
                        },
                    ]
                },
                {
                    id: "1",
                    title: "demo",
                    icon: "",
                    children: [
                        {
                            id: "1",
                            title: "matpanel",
                            link: "/MatPanelDemoComponent",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "ng2Tree",
                            link: "/Ng2TreeDemoComponent",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "antdTree",
                            link: "/AntdTreeDemoComponent",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "SelectTree",
                            link: "/SelectTreeDemoComponent",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "SelectTreeForm",
                            link: "/SelectTreeFormComponent",
                            icon: "",
                        },
                    ]
                },
            ]
        },
        {
            id: "1",
            title: "level1",
            icon: "",
            children: [
                {
                    id: "1",
                    title: "level2",
                    link: "ddd",
                    icon: "",
                },
                {
                    id: "1",
                    title: "demo",
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

    isSideBySide = true
    get mode() {
        return this.isSideBySide ? 'side' : 'over';
    }

    onHideMenu() {
        this.sideNav.close()
    }

    openedChange: EventEmitter<any> = new EventEmitter<any>(); 
    onSideChanged(e) {
        this.openedChange.emit()
    }
}