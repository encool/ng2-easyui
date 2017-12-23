export class Rule {
    field: string;
    op: string;
    data: string;
    constructor(field: string, op: string, data: string) {
        this.field = field
        this.op = op
        this.data = data
    }
}
