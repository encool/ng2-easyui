import { Component, OnInit, ViewChild, ContentChild, TemplateRef, AfterContentInit } from '@angular/core';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { EuTree } from "ng2-easyui.core";
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

    constructor() { }

    ngOnInit() {

    }

    ngAfterContentInit() {

    }
}