import { CURDAction } from '../curd.action'

export interface TreeNodeDef {
    children?: TreeNodeDef[];
    id: string;
    sid?: number
    name: string;
    hasChildren?: boolean
    isExpanded?: boolean

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
}

export class TreeEvent {
    constructor(options: { businessId: string, action: TreeAction, activeNodes?: Array<TreeNodeDef>, event?: any }) {
        this.businessId = options.businessId;
        this.action = options.action;
        this.activeNodes = options.activeNodes;
    }
    activeNodes: Array<TreeNodeDef>
    selectedNodes?: Array<TreeNodeDef>
    businessId: string;
    action: TreeAction
}

export class TreeAction extends CURDAction {

    constructor(options: CURDAction) {
        super(options)
    }
}

export class EuTreeOptions {
    treeId: string
    rootNodeName: string
    dataUrl: string
    actions?: Array<TreeAction> = []
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

    otherOptions?: any
    constructor(options:
        {
            treeId: string
            rootNodeName?: string
            dataUrl: string,
            actions?: Array<TreeAction>,
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
    }
}