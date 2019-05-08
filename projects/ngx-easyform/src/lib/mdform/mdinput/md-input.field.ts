import { InputField } from '../../core/field/input.field';

export class MdTextinputField extends InputField<string> {
    constructor(options: InputField<string>) {
        super(options);
        this.selector = 'ef-md-input'
        this.type = options.type || 'text'
    }
}