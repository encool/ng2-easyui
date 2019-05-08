import { FieldGroup } from '../../core/field/field-group';

export class MdFieldGroup extends FieldGroup{

    constructor(options: FieldGroup) {
        super(options)
        this.selector = "ef-md-field-group"
    }
}