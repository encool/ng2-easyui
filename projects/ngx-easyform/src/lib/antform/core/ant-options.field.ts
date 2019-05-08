import { OptionsField } from '../../core/field/options.field';

import { ValidatorFn, AsyncValidatorFn, Validators, AbstractControl } from '@angular/forms';

export abstract class AntOptionsField extends OptionsField {
  isHorizontal: boolean
  constructor(options: OptionsField & { isHorizontal?: boolean }) {
    super(options)
    this.isHorizontal = options.isHorizontal == undefined ? true : options.isHorizontal
  }
}
