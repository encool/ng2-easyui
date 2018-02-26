import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from "@angular/forms";
import { CdkPortal } from "@angular/cdk/portal";
import {
    EuTreeNode,
    EuTreeOptions,
    TreeEvent,
    EuTreeService
} from "ng2-easyui.core";
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { FieldBase } from "ng2-easyform";

@Component({
    selector: 'eu-tree-select',
    template: `
    <mat-form-field bsCol.sm="12" class="example-full-width">
        <input matInput placeholder="State" aria-label="State" [treeTrigger]="template" [treeComponent]="tree" [formControl]="formControl">
    </mat-form-field>    
    <ng-template>
        <eu-antd-tree class="tree-select" #tree="euAntdTree"
            (treeEvent)="onTreeEvent($event)"
            [euTreeOptions]="euTreeOptions"
            [euTreeNodes]="euTreeNodes">
        </eu-antd-tree>         
    </ng-template>
    `,
    styles: [`.tree-select .angular-tree-component{
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);`],
    encapsulation: ViewEncapsulation.None

})
export class SelectTreeComponent implements OnInit, AfterViewInit {
    formControl: FormControl;
    @Input() euTreeNodes: EuTreeNode[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Input() nzShiftSelectedMulti = true;

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()

    @Input() inputTreeService: EuTreeService

    @ViewChild(TemplateRef) template: TemplateRef<any>;
    // @ViewChild(AntdTreeComponent) tree: AntdTreeComponent;

    constructor() { }

    ngOnInit() {
        this.formControl = new FormControl();
    }

    ngAfterViewInit() {
        this.template
    }

    close() {

    }

    onTreeEvent($event) {

    }
}