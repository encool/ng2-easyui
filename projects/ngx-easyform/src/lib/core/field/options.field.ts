import { FieldBase } from './field-base';
import { Observable } from 'rxjs';
import { Subject } from "rxjs";

import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export abstract class OptionsField extends FieldBase<any> {
    options?: any[] | any = [];
    optionsUrl?: string
    optionsOb?: Observable<any> | Subject<any>
    dictName?: string
    optionId?: string
    optionName?: string
    multiple?: boolean
    constructor(options: FieldBase<any> & {
        options?: { key?: string, value?: string }[] | any
        optionsUrl?: string
        optionsOb?: Observable<any>
        dictName?: string
        optionId?: string
        optionName?: string
        multiple?: boolean
    }) {
        super(options);
        this.options = options['options'] || [];
        this.optionsUrl = options['optionsUrl'] || undefined;
        this.optionsOb = options['optionsOb'] || undefined;
        this.dictName = options['dictName'] || undefined;
        this.optionId = options['optionId'] || "key";
        this.optionName = options['optionName'] || "value";
        this.multiple = options.multiple || false
    }
}