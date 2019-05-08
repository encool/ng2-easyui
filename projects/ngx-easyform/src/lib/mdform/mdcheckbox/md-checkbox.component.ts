import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'

import { MdCheckboxField } from './md-checkbox.field'
import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-md-checkbox',
    component: MdCheckBoxComponent,
    field: MdCheckboxField,
    name: "CheckBox"
})
@Component({
    selector: 'ef-md-checkbox',
    template: `
      <mat-checkbox
          class="example-margin"
          [checked]="checked"
          [indeterminate]="indeterminate"
          [labelPosition]="labelPosition"
          [formControl]="formControl"
          [disableControl]="field.disabled"
          [hidden]="this.field.hidden"
          [bsCol.sm]="span" [bsCol.xs]="12"
          style="padding-top: 20px;padding-bottom: 15px; min-height: 65.5px;">
        {{label}}
      </mat-checkbox>    
    `
    // min-height:66px
    //   [eNfxFlex]="eNfxFlex" [eNfxFlex.xs]="eNfxFlexXs"  fxGrow="0"
})
export class MdCheckBoxComponent implements OnInit {
    @Input() field: any;
    @Input() form: FormGroup;

    span: number = 12
    label: string

    checked: boolean = false
    indeterminate: boolean = false
    labelPosition: string = 'after'

    eNfxFlex: string
    eNfxFlexXs: string
    formControl: AbstractControl
    constructor() { }

    ngOnInit() {
        this.formControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.label = this.field.label
        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
    }

}