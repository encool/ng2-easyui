import { AntFieldBase } from '../core/ant-field-base';

export class AntDatepickerField extends AntFieldBase<any> {
    constructor(options:AntFieldBase<any>) {
        super(options);
        this.selector = 'ef-ant-datepicker'
    }
}