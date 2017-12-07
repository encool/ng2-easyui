import { CURDAction } from '../curd.action'

export interface TreeNodeDef {
    children?: TreeNodeDef[];
    id: number;
    sid?: string
    name: string;
    hasChildren?: boolean
    isExpanded?: boolean
}

export class TreeEvent {
    constructor(node: TreeNodeDef, businessId: string, action: TreeAction, nodes?: Array<TreeNodeDef>, private event?: any) {
        this.node = node;
        this.businessId = businessId;
        this.action = action;
        this.nodes = nodes;
    }
    id: number;
    node: TreeNodeDef;
    businessId: string;
    action: TreeAction
    nodes: Array<TreeNodeDef>
}

export class TreeAction extends CURDAction {

    constructor(options: CURDAction) {
        super(options)
    }
}