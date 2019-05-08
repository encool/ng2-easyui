import { FieldBase } from './field-base';
import { ValidatorFn, AsyncValidatorFn, Validators, AbstractControl } from '@angular/forms';

export class InputField<T> extends FieldBase<any>{
    minLength?: number
    maxLength?: number
    pattern?: string
    [key: string]: any
    constructor(options: FieldBase<any> & {
        minLength?: number,
        maxLength?: number,
        pattern?: string,
    }) {
        super(options)
        this.minLength = options.minLength
        this.maxLength = options.maxLength
        this.pattern = options.pattern
    }
}