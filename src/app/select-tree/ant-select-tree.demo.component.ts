import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ant-select-tree-demo',
    template: `
    <ant-select-tree [label]="'test'" name="counter" [(model)]="model">
    </ant-select-tree>
    <button nz-button nzType="default" (click)="setValue()">set</button>
    <button nz-button nzType="default" (click)="getValue()">get</button>
    <span>{{model}}</span>
    `,
    styles: [``]
})
export class AntSelectTreeDemoComponent implements OnInit {

    model: string = "22"

    constructor() { }

    ngOnInit(): void { }

    setValue() {
        this.model = "11112"
    }

    getValue() {

    }
}
