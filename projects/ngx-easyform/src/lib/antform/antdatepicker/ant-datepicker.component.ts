import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'

import { AntDatepickerField } from "./ant-datepicker.field";
import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-ant-datepicker',
    component: AntDatepickerComponent,
    name: "时间日期选择",
    field: AntDatepickerField
})
@Component({
    selector: 'ef-ant-datepicker',
    template: `
      <nz-form-item nz-col [nzSpan]="field?.isHorizontal?span:false">
        <nz-form-label nz-col [nzSpan]="field?.isHorizontal?4:false">    
            <label *ngIf="required; else elseBlock" nz-form-item-required>{{label}}</label>
            <ng-template #elseBlock><label>{{label}}</label></ng-template>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="field?.isHorizontal?14:false" [nzValidateStatus]="form.controls[key]">
          <nz-date-picker [formControl]="fieldControl" nzShowTime [nzPlaceHolder]="'Select date'" [nzFormat]="'YYYY-MM-DD HH:mm:ss'"></nz-date-picker>
          <nz-form-explain *ngIf="fieldControl.dirty&&fieldControl.hasError('required')">请输入{{label}}!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>    
    `,
})
export class AntDatepickerComponent {
    @Input() field: AntDatepickerField;
    @Input() form: FormGroup;

    key: string
    span: number = 6
    label: string
    required: boolean = false
    isHorizontal: boolean = true

    fieldControl: AbstractControl

    constructor() {

    }

    ngOnInit() {
        this.fieldControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 6 : this.field.span
        this.required = this.field.required || false
        this.label = this.field.label

        this.key = this.field.key
    }
}