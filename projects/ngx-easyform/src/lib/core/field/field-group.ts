import { FieldBase } from './field-base';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export abstract class FieldGroup extends FieldBase<any>{
    groupName?: string
    fields: FieldBase<any>[]
    constructor(options: FieldBase<any> &
        {
            groupName?: string,
            fields: FieldBase<any>[]
        }) {
        super(options)
        this.controlType = "group"
        this.groupName = options.groupName
        this.fields = options.fields || []
    }
}