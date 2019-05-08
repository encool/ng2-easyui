import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    // NzGridModule,
    // NzFormModule,
    // NzDatePickerModule,
    // NzInputModule,
    // NzRadioModule,
    // NzSelectModule,
    // NzToolTipModule,
    // NzButtonModule,
    NgZorroAntdModule,
} from 'ng-zorro-antd';

import { AntDatepickerComponent } from './antdatepicker/ant-datepicker.component'
import { AntInputComponent } from './antinput/ant-input.component'
import { AntRadioGroupComponent } from './antradiogroup/ant-radio-group.component'
import { AntSelectComponent } from './antselect/ant-select.component'
import { AntFieldGroupComponent } from './fieldgroup/ant-field-group.component'
import { AntFieldsComponent } from './ant-fields.component'
import { AntFormComponent } from './ant-form.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // NzGridModule,
        // NzFormModule,
        // NzDatePickerModule,
        // NzInputModule,
        // NzRadioModule,
        // NzSelectModule,
        // NzToolTipModule,
        // NzButtonModule,
        NgZorroAntdModule,
    ],
    exports: [
        // NzGridModule,
        // NzFormModule,
        // NzDatePickerModule,
        // NzInputModule,
        // NzRadioModule,
        // NzSelectModule,
        // NzToolTipModule,
        // NzButtonModule,


        AntDatepickerComponent,
        AntInputComponent,
        AntRadioGroupComponent,
        AntSelectComponent,
        AntFieldGroupComponent,
        AntFieldsComponent,
        AntFormComponent,
    ],
    declarations: [
        AntDatepickerComponent,
        AntInputComponent,
        AntRadioGroupComponent,
        AntSelectComponent,
        AntFieldGroupComponent,
        AntFieldsComponent,
        AntFormComponent,
    ],
    providers: [

    ],
    entryComponents: [
        AntDatepickerComponent,
        AntInputComponent,
        AntRadioGroupComponent,
        AntSelectComponent,
        AntFieldGroupComponent,
        AntFieldsComponent,
    ]
})
export class EasyFormAntModule { }

export { AntFieldBase } from './core/ant-field-base'
export { AntOptionsField } from './core/ant-options.field'

export { AntDatepickerField } from './antdatepicker/ant-datepicker.field'
export { AntInputField } from './antinput/ant-input.field'
export { AntRadioGroupField } from './antradiogroup/ant-radio-group.field'
export { AntSelectField } from './antselect/ant-select.field'
export { AntFieldGroup } from './fieldgroup/ant-field-group'

export { AntFormComponent } from './ant-form.component'