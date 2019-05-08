import { Component, Input, Optional } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'

import { EfDictdataService } from '../../core/service/dictdata.service'

import { AntRadioGroupField } from "./ant-radio-group.field";
import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-ant-radio-group',
    component: AntRadioGroupComponent,
    name: "RadioGroupField",
    field: AntRadioGroupField
})
@Component({
    selector: 'ef-ant-radio-group',
    template: `
      <nz-form-item nz-col [nzSpan]="field?.isHorizontal?span:false">
        <nz-form-label nz-col [nzSpan]="field?.isHorizontal?4:false">
            <label *ngIf="required; else elseBlock" nz-form-item-required>{{label}}</label>
            <ng-template #elseBlock><label>{{label}}</label></ng-template>
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="field?.isHorizontal?14:false">
          <nz-radio-group [formControl]="fieldControl">
            <label nz-radio-button *ngFor="let option of options" [nzValue]="option[optionId]">
              <span>{{option[optionName]}}</span>
            </label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
`,
})
export class AntRadioGroupComponent {
    @Input() field: AntRadioGroupField;
    @Input() form: FormGroup;
    @Input() isEasyForm: boolean = false

    key: string
    span: number = 6
    label: string
    required: boolean = false
    isHorizontal: boolean = false

    dictName: string
    options: Array<any>
    optionId: string
    optionName: string

    fieldControl: AbstractControl
    constructor( @Optional() private dictdataService: EfDictdataService) {

    }

    ngOnInit() {
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
                } else {
                    this.options = this.field.options
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