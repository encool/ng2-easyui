import { Component, OnInit, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";

@Component({
    selector: 'tree-wrap',
    template: `
    <ng-template>
        <ng-content></ng-content>         
    </ng-template>    
    `
})
export class TreeWrapComponent implements OnInit {

    @ViewChild(TemplateRef) template: TemplateRef<any>;
    @ContentChild(AntdTreeComponent) tree: AntdTreeComponent
    constructor() { }

    ngOnInit() {

    }

}