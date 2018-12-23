import { Component, OnInit, ViewChild, ContentChild, TemplateRef, AfterContentInit, EventEmitter } from '@angular/core';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { EuTree } from "ngx-easyui-core";
@Component({
    selector: 'tree-wrap',
    template: `
    <ng-template>
        <ng-content></ng-content>         
    </ng-template>    
    `
})
export class TreeWrapComponent implements OnInit, AfterContentInit {

    @ViewChild(TemplateRef) template: TemplateRef<any>;
    // @ContentChild(AntdTreeComponent) tree: AntdTreeComponent
    @ContentChild(AntdTreeComponent) tree: EuTree
    initialized: EventEmitter<any> = new EventEmitter<any>()

    constructor() { }

    ngOnInit() {

    }

    ngAfterContentInit() {
        this.initialized.emit({})
    }
}