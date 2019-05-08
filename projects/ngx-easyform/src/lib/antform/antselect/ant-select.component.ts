import { Component, Input, Optional } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'

import { AntSelectField } from "./ant-select.field";

import { EfDictdataService } from '../../core/service/dictdata.service'

import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-ant-select',
    component: AntSelectComponent,
    name: "选择框",
    field: AntSelectField
})
@Component({
    selector: 'ef-ant-select',
    template: `
      <nz-form-item nz-col [nzSpan]="field?.isHorizontal?span:false">
        <nz-form-label nz-col [nzSpan]="field?.isHorizontal?4:false">
            <label *ngIf="required; else elseBlock" nz-form-item-required>{{label}}</label>
            <ng-template #elseBlock><label>{{label}}</label></ng-template>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="field?.isHorizontal?14:false">
          <nz-select [formControl]="fieldControl" [nzSize]="'large'" [nzMode]="'multiple'">
            <nz-option *ngFor="let option of options" 
                [nzValue]="option[optionId]" 
                [nzLabel]="option[optionName]">
            </nz-option>
          </nz-select>
            <nz-form-explain *ngIf="fieldControl.dirty&&fieldControl.hasError('required')">请输入{{label}}!</nz-form-explain>        
        </nz-form-control>
      </nz-form-item>
`,
})
export class AntSelectComponent {
    @Input() field: AntSelectField;
    @Input() form: FormGroup;
    @Input() isEasyForm: boolean;

    key: string
    span: number = 6
    label: string
    required: boolean = false
    isHorizontal: boolean = true

    dictName: string
    options: Array<any>
    optionId: string
    optionName: string
    fieldControl: AbstractControl

    constructor( @Optional() private dictdataService: EfDictdataService) {
        // debugger
    }

    ngOnInit() {
        this.fieldControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 6 : this.field.span
        this.required = this.field.required || false
        this.label = this.field.label

        this.key = this.field.key
        // debugger
        if (this.isEasyForm) {
            this.label = this.field.label
            this.key = this.field.key
            this.field._view = this
            this.fieldControl = this.field._control = this.form.get(this.field.key)
            this.span = this.field.span == undefined ? 4 : this.field.span

            // this.multiple = SelectComponent.isMutipleField(this.field)
            this.dictName = this.field.dictName
                || (this.field.params && this.field.params.primaryField ? this.field.params.primaryField.dictName : undefined)

            // this.patchValueToView()
            // this.controll.valueChanges.forEach(
            //     (data) => {
            //         this.patchValueToView()
            //     }
            // )

            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.options = data)
                } else if (this.dictName && this.dictdataService) {
                    this.dictdataService.getDictDataObserable(this.dictName).subscribe(data => this.options = data)
                    this.optionId = 'dictdataName'
                    this.optionName = 'dictdataValue'
                }
            } else {
                // this.options = this.field.options
                if (!(this.field.options instanceof Array)) {
                    this.optionId = 'key'
                    this.optionName = 'value'
                    setTimeout(() => {
                        this.options = this.transform(this.field.options)
                    });
                }
            }
        }
    }

    transform(value) {
        let keys: any = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}