import { FieldGroup } from '../../core/field/field-group';
import { FieldBase } from '../../core/field/field-base';
import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class AntFieldGroup extends FieldGroup{

    constructor(options: FieldGroup) {
        super(options)
        this.selector = "ef-ant-field-group"
    }
}