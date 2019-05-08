import { Input, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { UIComponent } from '../../core/decorator/ui-component.decorator'
import { MdTextinputField } from './md-input.field'
import { FormUtils } from "../../uitls/form.util";

@UIComponent({
    selector: 'ef-md-input',
    component: MdInputComponent,
    field: MdTextinputField,
    name: "文本框"
})
@Component({
    selector: 'ef-md-input',
    template:
        `
        <mat-form-field
            [bsCol.sm]="span"
            [bsCol.xs]="12"
            [hideRequiredMarker]="false"
            [hidden]="this.field.hidden">
          <input matInput 
            [type]="field.type || field.params.inputType " 
            [placeholder]="label" 
            [formControl]="fieldControl"
            [disableControl]="field.disabled"
          >
          <mat-error *ngIf="fieldControl.hasError('required')">
          <strong>必填项</strong>
          </mat-error>   
          <mat-error *ngFor="let key of this.errorsKeys">
          <strong>{{this.errors[key]}}</strong>
          </mat-error>                  
        </mat-form-field>      
  
    `
})
export class MdInputComponent implements OnInit {

    @Input() field: MdTextinputField;
    @Input() form: FormGroup;

    label: string
    span: number = 12

    errors: ValidationErrors = {}
    errorsKeys: String[] = []

    fieldControl: AbstractControl
    constructor() { }

    ngOnInit() {
        this.fieldControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.label = this.field.label
        // this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        // this.eNfxFlexXs = "100%"
        // debugger

        this.fieldControl.statusChanges.subscribe(data => {
            this.errors = this.fieldControl.errors
            FormUtils.doFormFieldInputStatusChanges(this.field, data, this.errors, this.errorsKeys)
        })
        this.fieldControl.valueChanges.subscribe(data => {
            // debugger
            if (this.field.valueChange instanceof Function) {
                this.field.valueChange(data)
            }
        })
    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        // debugger
        this.fieldControl
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
        }
    }
}