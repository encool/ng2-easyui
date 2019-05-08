import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import {
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    ErrorStateMatcher
} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { Bootstrap3GridModule } from "ng2-bootstrap3-grid";

import { FormstatusWrap, EasyFormCoreModule } from '../core/index'


import { MdDatepickerComponent } from './mddatepicker/md-datepicker.component'
import { MdInputComponent } from './mdinput/md-input.component'
import { MdTextareaComponent } from './mdinput/md-textarea.component'
import { MdCheckBoxComponent } from './mdcheckbox/md-checkbox.component'
import { MdRadioGroupComponent } from './mdradiogroup/md-radio-group.component'
import { MdSelectComponent } from './mdselect/md-select.component'
import { MdFieldGroupComponent } from './fieldgroup/md-field-group.component'
import { MdFieldsComponent } from './md-fields.component'
import { MdFormComponent } from './md-form.component'

// import { MdNativeDateModule } from '@angular/material'

export class MyErrorStateMatcher implements ErrorStateMatcher {
    // isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //   // Error when invalid control is dirty, touched, or submitted
    //   const isSubmitted = form && form.submitted;
    //   return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)));
    // }
    isErrorState(control: FormControl | null, form: FormstatusWrap | null): boolean {
        // Error when invalid control is dirty, touched, or submitted
        if (control && form) {
            const isChecked = form.checked
            return !!(control.invalid && (control.dirty || control.touched || isChecked));
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        // FlexLayoutModule,
        Bootstrap3GridModule,

        EasyFormCoreModule,
    ],
    exports: [
        MdDatepickerComponent,
        MdInputComponent,
        MdTextareaComponent,
        MdCheckBoxComponent,
        MdRadioGroupComponent,
        MdSelectComponent,
        MdFieldGroupComponent,
        MdFieldsComponent,
        MdFormComponent,
        // EnFlexDirective,
    ],
    declarations: [
        MdDatepickerComponent,
        MdInputComponent,
        MdTextareaComponent,
        MdCheckBoxComponent,
        MdRadioGroupComponent,
        MdSelectComponent,
        MdFieldGroupComponent,
        MdFieldsComponent,
        MdFormComponent,

        // EnFlexDirective,
    ],
    providers: [
        { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }
    ],
    entryComponents: [
        MdDatepickerComponent,
        MdInputComponent,
        MdTextareaComponent,
        MdCheckBoxComponent,
        MdRadioGroupComponent,
        MdSelectComponent,
        MdFieldGroupComponent,
        MdFieldsComponent,
    ]
})
export class EasyFormMdModule { }

// export * from './core/ant-field-base'
// export * from './core/ant-options.field'

export { MdDatepickerField } from './mddatepicker/md-datepicker.field'
export { MdTextinputField } from './mdinput/md-input.field'
export { MdTextareaField } from './mdinput/md-textarea.field'
export { MdCheckboxField } from './mdcheckbox/md-checkbox.field'
export { MdRadioGroupField } from './mdradiogroup/md-radio-group.field'
export { MdSelectField } from './mdselect/md-select.field'
export { MdFieldGroup } from './fieldgroup/md-field-group'

export { MdFormComponent } from './md-form.component'