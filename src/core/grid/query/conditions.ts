import { Rule } from './rule'
export class Conditions {
    groupOp: string
    rules: Rule[]
    groups: Conditions[]
    constructor(groupOp: string,
        rules: Rule[],
        groups: Conditions[]) {
        this.groupOp = groupOp
        this.rules = rules
        this.groups = groups
    }
}