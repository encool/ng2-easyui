import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { CdkPortal } from "@angular/cdk/portal";
import { Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import {
    EuTreeNode,
    EuTreeOptions,
    TreeEvent,
    EuTreeService
} from "ng2-easyui.core";
import { TreeWrapComponent } from "./tree-wrapper";
import { FieldBase, UIComponent } from "ng2-easyform";
import { SelectTreeField } from "./select-tree.field";
import { TreeSelectChange } from "./select-tree.input";

/** Error when invalid control is dirty, touched, or submitted. */
export class DefaultErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@UIComponent({
    selector: 'eu-tree-select',
    component: SelectTreeComponent
})
@Component({
    selector: 'eu-tree-select',
    template: `
    <mat-form-field [bsCol.sm]="span" [bsCol.xs]="12" style="line-height:1" [hidden]="this.field.hidden">
        <select-tree
            [formControl]="fieldControl" 
            [placeholder]="label"
            [treeTrigger]="tree"
            [disableControl]="field.disabled"
            (treeSelectChange)="onTreeSelectChange($event)">
        </select-tree>
        <mat-error>
        <strong>必填项</strong>
        </mat-error>          
    </mat-form-field>    
    <tree-wrap>
        <eu-antd-tree class="tree-select"
            (treeEvent)="onTreeEvent($event)"
            [euTreeOptions]="euTreeOptions"
            [euTreeNodes]="euTreeNodes">
        </eu-antd-tree>    
    </tree-wrap>
    `,
    styles: [`.tree-select .angular-tree-component{
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);`],
    encapsulation: ViewEncapsulation.None

})
export class SelectTreeComponent implements OnInit, AfterViewInit {
    fieldControl: AbstractControl;
    @Input() field: SelectTreeField
    @Input() form: FormGroup;

    label: string
    span: number = 12

    @Input() euTreeNodes: EuTreeNode[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Input() nzShiftSelectedMulti = true;

    /** An object used to control when error messages are shown. */
    @Input() errorStateMatcher: ErrorStateMatcher;

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()

    @Input() inputTreeService: EuTreeService

    @ViewChild(TreeWrapComponent) tree: TreeWrapComponent;
    // @ViewChild("tree1") tree: ElementRef;

    constructor() { }

    ngOnInit() {
        if (this.field) {
            if (!this.fieldControl && this.form) {
                this.fieldControl = this.form.get(this.field.key)
            } else if (!this.fieldControl && !this.form) {
                this.fieldControl = this._getFormControl(this.field)
            }
            this.span = this.field.span == undefined ? 4 : this.field.span
            this.label = this.field.label
            if (!this.euTreeOptions) {
                this.euTreeOptions = this.field.euTreeOptions
            }
            if (this.field.euTreeNodes && this.field.euTreeNodes.length > 0) {
                this.euTreeNodes = this.field.euTreeNodes
            }

            this.fieldControl.statusChanges.subscribe(data => {
                // this.errors = this.fieldControl.errors
                // FormUtils.doFormFieldInputStatusChanges(this.field, data, this.errors, this.errorsKeys)
            })
            this.fieldControl.valueChanges.subscribe(data => {
                if (this.field.valueChange instanceof Function) {
                    this.field.valueChange(data)
                }
            })
        }



    }
    ngDoCheck() {

    }

    ngAfterViewInit() {
        this.tree
    }

    onTreeSelectChange($event: TreeSelectChange) {
        let data = $event.value.data
        // this.fieldControl.patchValue(data.id)
    }

    close() {

    }

    onTreeEvent($event) {

    }

    _clear(e) {

    }

    _getFormControl(field: FieldBase<any>): FormControl {
        var validators = [];
        var asyncValidators = [];
        if (field.required) {
            validators.push(Validators.required)
        }
        if (field.validator) {
            validators.push(field.validator)
        }
        if (field.asyncValidator) {
            asyncValidators.push(field.asyncValidator)
        }
        if (validators.length > 0 && asyncValidators.length > 0) {
            return new FormControl({ value: field.value, disabled: field.disabled } || '', validators, asyncValidators)
        } else if (validators.length > 0) {
            return new FormControl({ value: field.value, disabled: field.disabled } || '', validators)
        } else if (asyncValidators.length > 0) {
            return new FormControl({ value: field.value, disabled: field.disabled } || '', null, asyncValidators)
        } else {
            return new FormControl({ value: field.value, disabled: field.disabled } || '')
        }
    }
}