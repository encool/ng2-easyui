import { AntOptionsField } from '../core/ant-options.field';

export class AntRadioGroupField extends AntOptionsField {

    constructor(options: AntOptionsField) {
        super(options);
        this.selector = 'ef-ant-radio-group'
    }
}