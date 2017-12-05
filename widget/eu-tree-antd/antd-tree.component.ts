import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'eu-antd-tree',
    template: `
    <nz-tree [nzNodes]="nodes"
    [nzOptions]="options"
    (nzEvent)="onEvent($event)"></nz-tree>    
    `
})
export class AntdTreeComponent implements OnInit {
    nodes = [
        {
            name: 'root1'
        },
        {
            name: 'root2'
        },
        {
            name: 'root3'
        },
        {
            name: 'async root4',
            hasChildren: true
        }
    ];

    options = {
        allowDrag: true
    };

    constructor() { }

    ngOnInit() {

    }

    onEvent(ev: any) {
        console.log('onEvent', ev);
    }
}