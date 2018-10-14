import { EventEmitter } from "@angular/core";
import { ModalConfig } from '../modal/modal-config'
import { BaseAction } from '../action';

export abstract class EuTree {
    check: EventEmitter<TreeEmitEvent>;
    decheck: EventEmitter<TreeEmitEvent>;
    toggleExpanded?: EventEmitter<TreeEmitEvent>;
    activate?: EventEmitter<TreeEmitEvent>;
    deactivate?: EventEmitter<TreeEmitEvent>;
    nodeActivate?: EventEmitter<TreeEmitEvent>;
    nodeDeactivate?: EventEmitter<TreeEmitEvent>;
    select: EventEmitter<TreeEmitEvent>
    deselect: EventEmitter<TreeEmitEvent>;
    focus?: EventEmitter<TreeEmitEvent>;
    blur?: EventEmitter<TreeEmitEvent>;
    updateData?: EventEmitter<TreeEmitEvent>;
    initialized: EventEmitter<TreeEmitEvent>;
    moveNode?: EventEmitter<TreeEmitEvent>;
    copyNode?: EventEmitter<TreeEmitEvent>;
    loadNodeChildren?: EventEmitter<TreeEmitEvent>;
    changeFilter?: EventEmitter<TreeEmitEvent>;
    event?: EventEmitter<TreeEmitEvent>;
    stateChange?: EventEmitter<TreeEmitEvent>;

    abstract refresh(params, node?: EuTreeNode, openState?, checkState?, selectedState?)
    abstract refreshSelectedNode()
    abstract refreshSelectedNodeParent()
    abstract getNodeById(id: string): EuTreeNode
    abstract getSelectedNode(): EuTreeNode
    abstract getSelectedNodes(): Array<EuTreeNode>
    abstract getCheckedNodes(checked?: boolean): Array<EuTreeNode>
    abstract setSelectedNode(idOrNode: string | EuTreeNode, selected: boolean)
}

export interface TreeEmitEvent {
    name: string
    tree?: EuTree
    node?: EuTreeNode
    nodes?: EuTreeNode[]
}

export abstract class EuTreeNode {
    children?: EuTreeNode[];
    id: string;
    sid?: number
    name: string;
    hasChildren?: boolean
    isExpanded?: boolean
    parent?: EuTreeNode
    originalNode?: any
    // data
    // displayField
    // elementRef
    // index
    // isActive
    // isCollapsed
    // isFocused
    // isLeaf
    // isRoot
    // level
    // parent
    // path
    // Methods    
    [propName: string]: any
}

export class TreeEvent {
    constructor(options: {
        businessId: string, action: TreeAction, activeEuNodes?: Array<EuTreeNode>, event?: any,
        selectedEuNodes?: Array<EuTreeNode>,
        data?: any
    }) {
        this.businessId = options.businessId;
        this.action = options.action;
        this.activeEuNodes = options.activeEuNodes;
        this.selectedEuNodes = options.selectedEuNodes
        this.data = options.data
    }
    activeEuNodes: Array<EuTreeNode>
    selectedEuNodes?: Array<EuTreeNode>
    businessId: string
    action: TreeAction
    data?: any
}

export class TreeAction extends BaseAction {

    constructor(options: BaseAction) {
        super(options)
    }
}

export class EuTreeOptions {
    treeId: string
    rootNodeName: string
    dataUrl: string
    actions?: Array<TreeAction> = []
    defaultActionModalConfig: ModalConfig
    //otherParam
    params?: any = {}
    //自动提交参数
    autoParam?: Array<string> = ["id", "pid"]
    //初始展开所有
    expendAll?: boolean = false
    //初始展开层级
    expendLevel?: number = 1
    //多选 按住ctrl键可多选
    selectedMulti?: boolean = false
    //设置 name 属性是否支持 HTML 脚本
    nameIsHTML?: boolean
    //勾选
    checkEnable?: boolean = false
    //checkbox 或 radio
    checkStyle?: string = "checkbox"
    // Y 属性定义 checkbox 被勾选后的情况； 
    // N 属性定义 checkbox 取消勾选后的情况； 
    // "p" 表示操作会影响父级节点； 
    // "s" 表示操作会影响子级节点。
    chkboxType?: any = { "Y": "p", "N": "s" };
    // 设置自动关联勾选时是否触发 beforeCheck / onCheck 事件回调函数。
    autoCheckTrigger?: boolean = false;

    nodeCheck?: (tree: EuTree, node: EuTreeNode, $event) => void
    nodeClick?: (tree: EuTree, node: EuTreeNode, $event) => void

    otherOptions?: any
    constructor(options:
        {
            treeId: string
            rootNodeName?: string
            dataUrl: string,
            actions?: Array<TreeAction>,
            defaultActionModalConfig?: ModalConfig,
            nameIsHTML?: boolean,
            //otherParam
            params?: any
            //自动提交参数
            autoParam?: Array<string>
            //初始展开所有
            expendAll?: boolean
            //初始展开层级
            expendLevel?: number
            //多选 按住ctrl键可多选
            selectedMulti?: boolean
            //勾选
            checkEnable?: boolean
            //checkbox 或 radio
            checkStyle?: string
            // Y 属性定义 checkbox 被勾选后的情况； 
            // N 属性定义 checkbox 取消勾选后的情况； 
            // "p" 表示操作会影响父级节点； 
            // "s" 表示操作会影响子级节点。
            chkboxType?: any
            // 设置自动关联勾选时是否触发 beforeCheck / onCheck 事件回调函数。
            autoCheckTrigger?: boolean
            nodeCheck?: (tree: EuTree, node: EuTreeNode, $event) => void
            nodeClick?: (tree: EuTree, node: EuTreeNode, $event) => void
        } = {
            treeId: "defaultZtreeId",
            dataUrl: "dataUrl"
        }) {
        this.treeId = options.treeId
        this.dataUrl = options.dataUrl
        this.actions = options.actions == undefined ? [] : options.actions
        this.nameIsHTML = options.nameIsHTML == undefined ? false : options.nameIsHTML
        this.params = options.params
        this.autoParam = options.autoParam == undefined ? ["id", "pid"] : options.autoParam
        this.expendAll = options.expendAll == undefined ? false : options.expendAll
        this.expendLevel = options.expendLevel == undefined ? 1 : options.expendLevel
        this.selectedMulti = options.selectedMulti == undefined ? false : options.selectedMulti
        this.checkEnable = options.checkEnable == undefined ? false : options.checkEnable
        this.checkStyle = options.checkStyle == undefined ? "checkbox" : options.checkStyle
        this.chkboxType = options.chkboxType == undefined ? { "Y": "p", "N": "s" } : options.chkboxType
        this.autoCheckTrigger = options.autoCheckTrigger == undefined ? false : options.autoCheckTrigger
        this.nodeCheck = options.nodeCheck
        this.nodeClick = options.nodeClick
    }
}