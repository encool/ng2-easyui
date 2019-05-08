import { AntOptionsField } from '../core/ant-options.field';

import { ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';

export class AntSelectField extends AntOptionsField {

    constructor(options: AntOptionsField) {
        super(options);
        this.selector = 'ef-ant-select'
    }
}
