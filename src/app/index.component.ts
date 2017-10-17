import { Component, OnInit, ViewChild } from '@angular/core';

import { MatContainerComponent, EuMatTab } from '../../'


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

    constructor() { }

    ngOnInit() {

    }

    tabadd() {
        debugger
    }
}