import { Component, EventEmitter, Output } from '@angular/core';

import { EuMatTab, EuTabService } from '../../'

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
            path: ["/demo/EuAggridDemoComponent",{p:1}],
            label: "aggrid1"
        },
        {
            path: ["/demo/EuAggridDemoComponent",{p:2}],
            label: "aggrid2"
        },
        {
            path: "/RichSwipeDemoComponent",
            label: "swipe"
        },
        {
            path: "/Bpmn2DemoComponent",
            label: "bpmn2"
        },
        {
            path: "/AngTreeDemoComponent",
            label: "ang-tree"
        },
    ]

    constructor(private euTabService: EuTabService) {

    }

}