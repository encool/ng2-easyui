import { InputField } from "ng2-easyform";
import { EuTreeOptions, EuTreeNode } from "ng2-easyui.core";

export class SelectTreeField extends InputField<any>{

    euTreeOptions: EuTreeOptions
    euTreeNodes?: EuTreeNode[]
    constructor(options: InputField<any> & {
        euTreeOptions: EuTreeOptions,
        euTreeNodes?: EuTreeNode[]
    }) {
        super(options)
        this.selector = "eu-tree-select"
        this.euTreeOptions = options.euTreeOptions
        this.euTreeNodes = options.euTreeNodes
    }
}