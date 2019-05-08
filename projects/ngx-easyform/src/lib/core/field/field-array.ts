import { FieldBase } from './field-base'
import { FieldGroup } from './field-group'

export class FieldArray {
    arrayName: string
    groups: FieldGroup[]
    constructor(options: {
        arrayName: string,
        groups?: FieldGroup[]
    }) {
        this.arrayName = options.arrayName
        this.groups = options.groups || []
    }
}