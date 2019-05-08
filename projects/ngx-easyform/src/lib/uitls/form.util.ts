import { FieldBase } from "../core/field/field-base";

export class FormUtils {

    static doFormFieldInputStatusChanges(field: FieldBase<any>, status: String,
        errors: any, errorsKeys: any[]) {
        if (errors == null) {
            errorsKeys.length = 0
            return
        }
        FormUtils.doErrors(errors, errorsKeys)
        if (field.statusChange instanceof Function) {
            field.statusChange(status)
        }
    }

    static doErrors(errors, errorsKeys: any[]) {
        errorsKeys.length = 0
        for (let p in errors) {
            if (p != "required") {
                errorsKeys.push(p)
            }
        }
        return errorsKeys
    }
}