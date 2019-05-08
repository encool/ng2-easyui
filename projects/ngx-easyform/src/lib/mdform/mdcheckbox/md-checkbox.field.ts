
import { FieldBase } from '../../core/field/field-base';

export class MdCheckboxField extends FieldBase<any> {
    constructor(options: FieldBase<any>) {
        super(options);
        this.selector = 'ef-md-checkbox'
    }
}