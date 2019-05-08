import { FieldBase } from '../../core/field/field-base';

import { ValidatorFn, AsyncValidatorFn, Validators, AbstractControl } from '@angular/forms';

export abstract class AntFieldBase<T> extends FieldBase<any>{
  isHorizontal?: boolean
  constructor(options: FieldBase<any> & { isHorizontal?: boolean }) {
    super(options)
    this.isHorizontal = options.isHorizontal == undefined ? true : options.isHorizontal
  }
}
