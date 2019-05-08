import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AntFieldGroup } from './ant-field-group'

import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-ant-field-group',
    component: AntFieldGroupComponent,
    name:"字段Group"
})
@Component({
    selector: 'ef-ant-field-group',
    template: `
    <div [formGroup]="form">
        <div [formGroup]="form" [formGroupName]="field.key">
            <ef-ant-fields [form]="form.controls[field.key]" [fields]="field.fields" [model]="model">
            </ef-ant-fields>
        </div>
    </div>
    `,
})
export class AntFieldGroupComponent{
    @Input() field: AntFieldGroup;
    @Input() form: FormGroup
    @Input() model: any = {}
}