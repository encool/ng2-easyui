import { InputField } from '../../core/field/input.field';

export class MdTextareaField extends InputField<string> {
    constructor(options: InputField<string>) {
        super(options);
        this.selector = 'ef-md-textarea'
        this.type = 'textarea'
    }
}