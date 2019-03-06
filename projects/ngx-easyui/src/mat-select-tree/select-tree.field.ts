import { InputField } from "ngx-easyform";
import { EuTreeOptions, EuTreeNode } from "ngx-easyui-core";

export class MatSelectTreeField extends InputField<any>{

    euTreeOptions: EuTreeOptions
    euTreeNodes?: EuTreeNode[]
    constructor(options: InputField<any> & {
        euTreeOptions: EuTreeOptions,
        euTreeNodes?: EuTreeNode[]
    }) {
        super(options)
        this.selector = "mat-select-tree"
        this.euTreeOptions = options.euTreeOptions
        this.euTreeNodes = options.euTreeNodes
    }
}