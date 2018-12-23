import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Optional, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";
import {
    OnAction,
    TreeAction,
    TreeEvent,
    EuTreeNode,
    EuTreeOptions,
    CURDAction,
    ModalConfig,
    EuModalService,
    EuTreeService,
    EuTree
} from "ngx-easyui-core";

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd';

@Component({
    selector: 'eu-antd-tree',
    template: `
    <nz-tree class="eu-antd-tree"
      #treeCom
      [nzData]="_nzNodes"
      [nzShowLine]="nzShowLine"
      [nzCheckable]="nzCheckable"
      [nzMultiple]="euTreeOptions.selectedMulti"
      [nzCheckedKeys]="checkedKeys"
      [nzExpandedKeys]="expandedKeys"
      [nzSelectedKeys]="selectedKeys"
      (nzClick)="onNzClick($event)"
      (nzCheckBoxChange)="nzEvent($event)"
      nzAsyncData="true"
      (nzClick)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)">
    </nz-tree>
    `,
    exportAs: "euAntdTree",
    styles: [`.eu-antd-tree{background: white;color: rgba(0, 0, 0, 0.87);}"`],
    encapsulation: ViewEncapsulation.None
})
export class AntdTreeComponent implements OnInit, OnAction, EuTree {
    // [nzAutoExpandParent]="2"

    @Input() euTreeNodes: EuTreeNode[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()
    @Output() euTreeCheck: EventEmitter<{
        checked: boolean,
        eventName: string,
        euTreeNode: EuTreeNode,
        node: any
    }> = new EventEmitter<any>()

    select: EventEmitter<any> = new EventEmitter<any>()
    deselect: EventEmitter<any> = new EventEmitter<any>()
    // activate: EventEmitter<any> = new EventEmitter<any>()
    // deactivate: EventEmitter<any> = new EventEmitter<any>()
    check: EventEmitter<any> = new EventEmitter<any>()
    decheck: EventEmitter<any> = new EventEmitter<any>()
    initialized: EventEmitter<any> = new EventEmitter<any>()

    @ViewChild("treeCom") nzTree: NzTreeComponent

    @Input() inputTreeService: EuTreeService

    params: any = {}
    autoParams: string[] = ['id']
    nzCheckable = false;
    nzShowLine = true;
    _dataUrl: string
    _nzOptions: any
    _nzNodes: NzTreeNodeOptions[]

    checkedKeys = [];
    selectedKeys = [];
    expandedKeys = [];

    constructor(private httpClient: HttpClient,
        @Optional() private treeService: EuTreeService,
        private euModalService: EuModalService,
        public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this._nzNodes = this.euTreeNodeToTreeNode(this.euTreeNodes)
        this.nzCheckable = this.euTreeOptions.checkEnable
        if (this.euTreeOptions.otherOptions && this.euTreeOptions.otherOptions.nzShowLine != null) {
            this.nzShowLine = this.euTreeOptions.otherOptions.nzShowLine
        }
        this._dataUrl = this.euTreeOptions.dataUrl
        this.params = this.euTreeOptions.params || {}

        if (!this._nzNodes || this._nzNodes.length == 0) {
            this.refresh(this.params)
        }
    }

    nzEvent(event: NzFormatEmitEvent): void {
        console.log(event);
        // load child async
        if (event.eventName === 'expand') {
            if (event.node.isExpanded && event.node.isLoading) {
                this.getAndSetNodes(this.params, event.node)
            }
        } else if (event.eventName === 'check') {
            let euTreeNode = this.treeNodeToEuTreeNode(event.node)
            let emitevent = {
                // checked: e.checked,
                checked: false,
                eventName: event.eventName,
                euTreeNode: euTreeNode,
                node: event.node
            }
            this.euTreeCheck.emit(emitevent)
            debugger
            if (euTreeNode.isCheck) {
                this.check.emit({ node: euTreeNode, tree: this })
            }

            if (this.euTreeOptions.nodeCheck) {
                this.euTreeOptions.nodeCheck(this, euTreeNode, event)
            }
        } else if (event.eventName === 'click') {
            let euTreeNode = this.treeNodeToEuTreeNode(event.node)
            if (euTreeNode.selected) {
                this.select.emit({ node: euTreeNode, tree: this })
            } else {
                this.deselect.emit({ node: euTreeNode, tree: this })
            }
        }
    }

    onCheck(e: NzFormatEmitEvent) {

    }

    // onDeCheck(e) {
    //     let euTreeNode = this.treeNodeToEuTreeNode(e.node)
    //     this.decheck.emit({ node: euTreeNode, tree: this })
    // }

    // onActivate(e: any) {
    //     let euTreeNode = this.treeNodeToEuTreeNode(e.node)
    //     this.select.emit({ node: euTreeNode, tree: this })
    // }

    onDeActivate(e: any) {

    }

    onNzClick($event) {

    }

    onNzLoadNodeChildren($event) {

    }

    /**
     * 
     * @param modalConfig 
     * @param data 
     * @param node node to refresh
     */
    openDialog(modalConfig: ModalConfig, data: any, node: EuTreeNode): void {
        if (!modalConfig.data) {
            modalConfig.data = {}
        }
        Object.assign(modalConfig.data, data)
        this.euModalService.open(modalConfig, (result) => {
            if (node) {
                this.refreshNode(node)
            }
        }, (result) => {
            if (node) {
                this.refreshNode(node)
            }
        })
    }

    euOnAction(baseAction: TreeAction) {
        let defnodes = this.getSelectedNodes()
        let event: TreeEvent = {
            businessId: this.euTreeOptions.treeId,
            activeEuNodes: defnodes,
            action: baseAction,
        }
        // let nodes = this.getActiveNodes()
        let nodes = this.getSelectedNodes()
        if (baseAction instanceof CURDAction) {
            switch (baseAction.curdType) {
                case CURDAction.TYPE_CREATE:
                    if (defnodes.length == 1) {
                        let modalConfig = baseAction.modalConfig || this.euTreeOptions.defaultActionModalConfig
                        //有component才打开component
                        if (modalConfig.component) {
                            this.openDialog(modalConfig, {
                                euTreeEvent: event
                            }, nodes[0])
                        }
                    } else {
                        this.snackBar.open('请选择一个需要新增到的父节点！', '关闭', {
                            duration: 800
                        });
                    }
                    break
                case CURDAction.TYPE_UPDATE:
                    if (defnodes.length == 1) {
                        let modalConfig1 = baseAction.modalConfig || this.euTreeOptions.defaultActionModalConfig
                        //有component才打开component
                        if (modalConfig1.component) {
                            this.openDialog(modalConfig1, { euTreeEvent: event }, nodes[0].parent)
                        }
                    } else {
                        this.snackBar.open('请选择一个节点！', '关闭', {
                            duration: 800
                        });
                    }
                    break
                case CURDAction.TYPE_QUERY:
                    break
                case CURDAction.TYPE_READ:
                    if (nodes.length == 1) {
                        this.refreshNode(nodes[0])
                    }
                    break
                case CURDAction.TYPE_DELETE:
                    break
                default:

            }
        } else {
            //有modal配置就是要打开modal咯
            if (baseAction && baseAction.modalConfig && baseAction.modalConfig.component) {
                this.openDialog(baseAction.modalConfig, { euGridEvent: event }, nodes[0])
            }
        }

        this.treeEvent.emit(event)
    }

    refresh(params, node?: EuTreeNode, openState?, checkState?, selectedState?) {
        if (node && node.originalNode) {
            // (node.originalNode as NzTreeNode).loadNodeChildren()
            this.getAndSetNodes(undefined, node.originalNode)
        } else if (node && !node.originalNode && node.id) {
            // let treeNode: TreeNode = this.nzTree.treeModel.getNodeById(node.id)
            // treeNode.loadNodeChildren()
            // this.nzTree.getTreeNodes();
        } else if (!node) {
            this.getAndSetNodes(params, null)
        }
    }

    public getNodeById(id: string): EuTreeNode {
        // let node: any = this.nzTree.treeModel.getNodeById(id)
        let node: NzTreeNode[] = this.nzTree.getTreeNodes().filter(node => {
            node.key == id
        })
        if (node && node.length > 0) {
            return this.treeNodeToEuTreeNode(node[0])
        } else {
            return null
        }
    }

    setSelectedNode(idOrNode: string | EuTreeNode, selected: boolean) {
        // this.setActiveNode(idOrNode, selected)
        if (typeof idOrNode == 'string') {
            let index = this.selectedKeys.findIndex((key) => {
                return key == idOrNode
            })
            if (index == -1) {
                if (selected) {
                    this.selectedKeys.push(idOrNode)
                }
            } else {
                if (!selected) {
                    this.selectedKeys.splice(index)
                }
            }

        } else if (!idOrNode) {

        } else if (idOrNode.id) {

        }
    }

    setActiveNode(idOrNode: string | EuTreeNode, selected: boolean): any {
        // if (typeof idOrNode == 'string') {
        //     this.setActiveNode
        //     let node: any = this.nzTree.treeModel.getNodeById(idOrNode)
        //     if (node) {
        //         this.nzTree.treeModel.setActiveNode(node, true)
        //     }
        // } else if (!idOrNode) {
        //     this.nzTree.treeModel.setActiveNode({}, false)
        // } else if (idOrNode.id) {
        //     this.setActiveNode(idOrNode.id, selected)
        // }
    }

    private getAndSetNodes(params, node?: NzTreeNode): Promise<EuTreeNode[]> {
        let eunode
        if (node) {
            eunode = this.treeNodeToEuTreeNode(node)
            this.autoParams.forEach(value => {
                if (eunode[value]) {
                    params[value] = eunode[value]
                }
            })
        }
        return this.getTreeService().getTreeNodes(this._dataUrl, eunode, params).then(data => {
            if (node) {
                node.addChildren(this.euTreeNodeToTreeNode(data))
            } else {
                this._nzNodes = this.euTreeNodeToTreeNode(data)
            }
            return data
        })
    }

    private treeAsyncSuccess(ztree, openState, checkState, selectedState, openNodes, checkedNodes, selectedNodes) {

    }

    refreshSelectedNode() {
        this.refreshActiveNode()
    }

    refreshActiveNode() {
        var params = this.params
        if (!params) {
            params = {};
        }
        var activeNode = this.getActiveDefNode()
        if (activeNode) {
            this.refresh(params, activeNode.parent, false, false, false);
        } else {
            console.warn("refreshActiveNode while no active node")
            this.refresh(params);
        }
    }

    refreshSelectedNodeParent() {
        this.refreshActiveNodeParent()
    }

    refreshActiveNodeParent() {
        var params = this.params
        if (!params) {
            params = {};
        }
        var activeNode = this.getActiveDefNode()
        if (activeNode && activeNode.parent) {
            this.refresh(params, activeNode.parent, false, false, false);
        } else {
            console.warn("refreshActiveNodeParent while no active node or parent node")
            this.refresh(params);
        }
    }

    private refreshNode(node: EuTreeNode, id?: string, pid?: string) {
        // node.loadNodeChildren()
    }

    getSelectedNode(): EuTreeNode {
        return this.getActiveDefNode()
    }

    /**
     * 获取一个选择的node
     */
    getActiveDefNode(): EuTreeNode {
        let nodes = this.getActiveDefNodes()
        if (nodes && nodes.length > 0) {
            return nodes[0]
        } else {
            return null
        }
    }

    getSelectedNodes(): Array<EuTreeNode> {
        return this.treeNodeToEuTreeNodes(this.nzTree.getSelectedNodeList())
    }

    getActiveDefNodes(): Array<EuTreeNode> {
        // let nodes: TreeNode[] = this.getActiveNodes()
        // let rnodes = new Array<EuTreeNode>()
        // nodes.forEach(node => {
        //     let enNodeDef: EuTreeNode = this.treeNodeToEuTreeNode(node)
        //     rnodes.push(enNodeDef)
        // })
        // return rnodes
        return null
    }

    // private getActiveNodes(): Array<TreeNode> {
    //     // let nodes: TreeNode[] = Object.assign([], this.nzTree.treeModel.getActiveNode())
    //     let nodes: TreeNode[] = this.nzTree.treeModel.getActiveNodes()
    //     return nodes
    // }

    private checkedLeafNodes: EuTreeNode[] = []
    private checkedParentNodes: EuTreeNode[] = []
    private checkedNodes: EuTreeNode[] = []



    getCheckedNodes(checked?: boolean): Array<EuTreeNode> {
        // return this.checkedLeafNodes.concat(this.checkedParentNodes)
        this.checkedLeafNodes = []
        this.checkedParentNodes = []
        this.checkedNodes = []
        let nodes: any[] = this.nzTree.nzNodes
        let _this = this
        function doNodes(nodes: any[]) {
            nodes.forEach(node => {
                if (node.checked) {
                    _this.checkedNodes.push(node)
                }
                if (node.children) {
                    doNodes(node.children)
                }
            })
        }
        doNodes(nodes)
        return this.checkedNodes
    }

    refreshTree() {

    }

    private getTreeService(): EuTreeService {
        return this.inputTreeService || this.treeService
    }

    private treeNodeToEuTreeNode(node: NzTreeNode): EuTreeNode {
        let euNodeDef: EuTreeNode = Object.assign({
            id: node.key,
            name: node.title,
            isExpanded: node.isExpanded
        }, node.origin)
        if (node.parentNode) {
            euNodeDef.parent = this.treeNodeToEuTreeNode(node.parentNode)
        }
        euNodeDef.originalNode = node
        return euNodeDef
    }

    private treeNodeToEuTreeNodes(nodes: NzTreeNode[]): EuTreeNode[] {
        return nodes.map(node => {
            return this.treeNodeToEuTreeNode(node)
        })
    }

    private euTreeNodeToTreeNode(nodes: EuTreeNode[]) {
        if (nodes) {
            return nodes.map((node): NzTreeNodeOptions => {
                let n: NzTreeNodeOptions = {
                    key: node.id,
                    title: node.name,
                    children: this.euTreeNodeToTreeNode(node.children)
                }
                return n;
            })
        } else {
            return []
        }
    }

}