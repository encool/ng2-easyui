import { OptionsField } from '../../core/field/options.field';

export class MdRadioGroupField extends OptionsField {
    noneOption: boolean = true
    constructor(options: OptionsField & { noneOption?: boolean }) {
        super(options);
        this.selector = 'ef-md-radios' 
        this.noneOption = options.noneOption == undefined ? true : options.noneOption
    }
}