import { Component, OnInit, ViewChild } from '@angular/core';

import { MatContainerComponent, EuMatTab } from '../../'


@Component({
    selector: 'demo-index',
    template: `
    <mat-toolbar color="primary">My Application</mat-toolbar>
    <eu-mat-container [indexTab]="indexTab"></eu-mat-container>
    `
})
export class IndexComponent implements OnInit {

    indexTab: EuMatTab = {
        path: ["/EntryComponent"],
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