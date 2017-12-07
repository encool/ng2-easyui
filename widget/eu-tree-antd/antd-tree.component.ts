import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'eu-antd-tree',
    template: `
    <nz-tree 
        [nzNodes]="nzNodes"
        [nzOptions]="nzOptions"
        [nzCheckable]="nzCheckable"
        (nzEvent)="onEvent($event)">
    </nz-tree>
    `
})
export class AntdTreeComponent implements OnInit {

    @Input() nzNodes: any[];
    @Input() nzCheckable = false;
    @Input() nzShowLine = false;
    @Input() nzOptions: any = {
        allowDrag: true
    }
    @Input() nzShiftSelectedMulti = true;

    constructor() { }

    ngOnInit() {
        this.nzNodes
        this.nzOptions
    }

    onEvent(ev: any) {
        console.log('onEvent', ev);
    }
}