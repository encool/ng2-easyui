import { Component, OnInit, Input, ViewChild, Self, Optional, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NzFormatEmitEvent, NzTreeSelectComponent } from 'ng-zorro-antd';

import { UIComponent } from "ngx-easyform";
import { AntSelectTreeField } from "./ant-select-tree.field";

@UIComponent({
    selector: 'ant-select-tree',
    component: AntSelectTreeComponent,
    name: "Ant树选择",
    field: AntSelectTreeField
})
@Component({
    selector: 'ant-select-tree',
    template: `
    <nz-form-item nz-col [nzSpan]="isHorizontal?span:false">
        <nz-form-label nz-col [nzSpan]="isHorizontal?4:false" [nzRequired]="required">    
            {{label}}
        </nz-form-label>
    <nz-form-control nz-col [nzSpan]="isHorizontal?14:false">
        <nz-tree-select *ngIf="standalone" style="width: 250px"
            nzPlaceHolder="Please select"
            [nzDefaultExpandedKeys]="expandKeys"
            [nzDropdownMatchSelectWidth]="true"
            [nzDropdownStyle]="{ 'max-height': '300px' }"
            [(ngModel)]="model"
            [nzNodes]="nodes"
            [nzAsyncData]="true"
            (nzExpandChange)="onExpandChange($event)"
            (ngModelChange)="onChange($event)">
        </nz-tree-select>
        <nz-tree-select *ngIf="!standalone" style="width: 250px"
            nzPlaceHolder="Please select"
            [nzDefaultExpandedKeys]="expandKeys"
            [nzDropdownMatchSelectWidth]="true"
            [nzDropdownStyle]="{ 'max-height': '300px' }"
            [formControl]="fieldControl"
            [nzNodes]="nodes"
            [nzAsyncData]="true"
            (nzExpandChange)="onExpandChange($event)"
            (ngModelChange)="onChange($event)">
        </nz-tree-select>
        <span>{{model}}</span>
    </nz-form-control>
  </nz-form-item>

    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AntSelectTreeComponent),
            multi: true
        }
    ],
    styles: [``]
})
export class AntSelectTreeComponent implements ControlValueAccessor, OnInit {
    @Input() field: AntSelectTreeField;
    @Input() form: FormGroup;

    @Input() key: string
    @Input() span: number = 6
    @Input() label: string
    @Input() required: boolean = false
    @Input() isHorizontal: boolean = true
    @Input("model") model: any
    @Input() standalone = true
    // model: any

    @Output("modelChange") update = new EventEmitter();

    fieldControl: AbstractControl
    @ViewChild(NzTreeSelectComponent) treeSelect: NzTreeSelectComponent

    expandKeys = ['0-0'];
    value: string;
    nodes = [{
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1'
        }, {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2'
        }]
    }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1'
    }];

    constructor() {

    }

    onExpandChange(e: NzFormatEmitEvent): void {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
            this.loadNode().then(data => {
                e.node.addChildren(data);
            });
        }
    }

    loadNode(): Promise<any[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve([
                { title: 'Child Node', key: `${(new Date()).getTime()}-0` },
                { title: 'Child Node', key: `${(new Date()).getTime()}-1` }]),
                1000);
        });
    }
    ngOnInit(): void {
        if (this.form) {
            this.standalone = false
            this.fieldControl = this.form.get(this.field.key)
            this.span = this.field.span == undefined ? 6 : this.field.span
            this.required = this.field.required || false
            this.label = this.field.label
            this.isHorizontal = this.field.isHorizontal
            this.key = this.field.key
        }
    }

    _onChange: (_: any) => void


    onChange(_: any): void {
        this.update.emit(_)
    }

    writeValue(_: any) {

    }

    registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    registerOnTouched() {

    }
}
