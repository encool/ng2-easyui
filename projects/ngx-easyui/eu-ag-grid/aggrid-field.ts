import { FieldBase } from 'ngx-easyform';

export class AggridField extends FieldBase<any> {

    constructor(options: FieldBase<any>) {
        super(options);
        this.selector = 'eu-aggrid'
    }
}