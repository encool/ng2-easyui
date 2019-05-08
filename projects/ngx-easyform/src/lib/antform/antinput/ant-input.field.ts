import { InputField } from '../../core/field/input.field';

export class AntInputField extends InputField<any> {
    type: any
    isHorizontal: boolean = true

    params: object
    constructor(options: InputField<any> & { isHorizontal: boolean }) {
        super(options);
        this.selector = 'ef-ant-input'
        this.type = options.type || 'text'
        this.isHorizontal = options.isHorizontal == undefined ? true : options.isHorizontal
    }
}