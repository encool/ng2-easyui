import { Input, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

import { MdTextareaField } from './md-textarea.field'
import { UIComponent } from '../../core/decorator/ui-component.decorator'
import { FormUtils } from "../../uitls/form.util";

@UIComponent({
    selector: 'ef-md-textarea',
    component: MdTextareaComponent,
    field: MdTextareaField,
    name: "文本域"
})
@Component({
    selector: 'ef-md-textarea',
    template:
        `
        <mat-form-field [bsCol.sm]="span" [bsCol.xs]="12" [hidden]="this.field.hidden">
          <textarea  matInput [type]="field.type || field.params.inputType" [placeholder]="lable" [formControl]="fieldControl"
            [disableControl]="field.disabled">
          </textarea>
          <mat-error *ngIf="fieldControl.hasError('required')">
          <strong>必填项</strong>
          </mat-error>     
          <mat-error *ngFor="let key of this.errorsKeys">
          <strong>{{this.errors[key]}}</strong>
          </mat-error>                 
        </mat-form-field>      
  
    `
})
export class MdTextareaComponent implements OnInit {

    @Input() field: any;
    @Input() form: FormGroup;

    lable: string
    span: number = 12

    errors: ValidationErrors = {}
    errorsKeys: String[] = []

    fieldControl: AbstractControl
    constructor() { }

    ngOnInit() {
        this.fieldControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.lable = this.field.label
        // this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        // this.eNfxFlexXs = "100%"
        // debugger
        this.fieldControl.statusChanges.subscribe(data => {
            this.errors = this.fieldControl.errors
            FormUtils.doFormFieldInputStatusChanges(this.field, data, this.errors, this.errorsKeys)
        })      
    }

}