import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import {
    EuMatTab, EuTabService
    // } from '../../widget'
} from 'ngx-easyui'
import { EuModalService } from "ngx-easyui-core";
@Component({
    selector: 'index-app',
    template: `
    <div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 400px;">
        <div style="
        display: flex;
        flex-direction: row;
        justify-content: center;">
            <button mat-raised-button *ngFor="let link of links" [routerLink]="link.path">{{link.label}}</button>
            <button mat-raised-button (click)="modalClick($event)">modal</button>
            
        </div>
    </div>
`,
})
export class EntryComponent {

    links: {
        path,
        label
    }[] = [
            {
                path: "/demo/EuAggridDemoComponent",
                label: "aggrid"
            },
            {
                path: ["/demo/EuAggridDemoComponent", { id1: "1" }],
                label: "aggrid1 参数1"
            },
            {
                path: ["/demo/EuAggridDemoComponent", { id1: "2" }],
                label: "aggrid2 参数2"
            },
            {
                path: "/RichSwipeDemoComponent",
                label: "swipe"
            },
            {
                path: "Bpmn2Demo/Bpmn2DemoComponent",
                label: "bpmn2"
            },
            {
                path: "/AngTreeDemoComponent",
                label: "ang-tree"
            },
            {
                path: ["/EntryComponent", { p: 1 }],
                label: "entry1 参数1"
            },
            {
                path: ["/EntryComponent", { p: 2 }],
                label: "entry2 参数2"
            },
            {
                path: ["/EntryComponent", { p: 2 }],
                label: "entry2 参数2"
            },
        ]

    constructor(private euTabService: EuTabService, private activatedRoute: ActivatedRoute,
        private euModalService: EuModalService) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            // debugger
        });
    }

    modalClick(e) {
        this.euModalService.openConfirm({ message: "是<br>否" }, () => {

        })
    }
}