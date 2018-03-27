import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Optional, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { MatSnackBar } from "@angular/material";

import { OnAction, TreeAction, TreeEvent, EuTreeNode, EuTreeOptions, CURDAction, ModalConfig, EuModalService, EuTreeService } from "ng2-easyui.core";

import { NzTreeComponent } from "ng-tree-antd";
import { TreeNode } from "angular-tree-component";

@Component({
    selector: 'eu-antd-tree',
    template: `
    <nz-tree 
        [nzNodes]="_nzNodes"
        [nzOptions]="_nzOptions"
        [nzCheckable]="nzCheckable"
        [nzShowLine]="nzShowLine"
        (nzCheck)="onCheck($event)"
        (nzEvent)="onEvent($event)"
        (nzLoadNodeChildren)="onNzLoadNodeChildren($event)">
    </nz-tree>
    `,
    exportAs: "euAntdTree",
    styles: [`.angular-tree-component{background: white;color: rgba(0, 0, 0, 0.87);}"`],
    encapsulation: ViewEncapsulation.None
})
export class AntdTreeComponent implements OnInit, OnAction {

    @Input() euTreeNodes: EuTreeNode[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Input() nzShiftSelectedMulti = true;

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()
    @Output() euTreeCheck: EventEmitter<{
        checked: boolean,
        eventName: string,
        euTreeNode: EuTreeNode,
        node: any
    }> = new EventEmitter<any>()

    @ViewChild(NzTreeComponent) nzTree: NzTreeComponent

    @Input() inputTreeService: EuTreeService

    params: any = {}
    autoParams: string[] = ['id']
    nzCheckable = false;
    nzShowLine = true;
    _dataUrl: string
    _nzOptions: any
    _nzNodes: any[]

    constructor(private httpClient: HttpClient,
        @Optional() private treeService: EuTreeService,
        private euModalService: EuModalService,
        public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this._nzNodes = this.euTreeNodes
        this.nzCheckable = this.euTreeOptions.checkEnable
        if (this.euTreeOptions.otherOptions && this.euTreeOptions.otherOptions.nzShowLine != null) {
            this.nzShowLine = this.euTreeOptions.otherOptions.nzShowLine
        }
        this._dataUrl = this.euTreeOptions.dataUrl
        this.params = this.euTreeOptions.params || {}

        this._nzOptions = Object.assign({
            getChildren: (node: TreeNode) => {
                return this.getNodes(this.params, node)
            }
        }, this.euTreeOptions.otherOptions)
        if (!this._nzNodes || this._nzNodes.length == 0) {
            this.refresh(this.params)
        }
    }

    onEvent(ev: any) {
        // console.log('onEvent', ev);
    }

    onNzLoadNodeChildren($event) {
        let node: TreeNode = $event.node
        if (node.data.checked) {
            (this.nzTree as any).updateCheckState(node, true)
        }
    }

    /**
     * 
     * @param modalConfig 
     * @param data 
     * @param node node to refresh
     */
    openDialog(modalConfig: ModalConfig, data: any, node: TreeNode): void {
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

        let defnodes = this.getActiveDefNodes()
        let event: TreeEvent = {
            businessId: this.euTreeOptions.treeId,
            activeEuNodes: defnodes,
            action: baseAction,
        }
        let nodes = this.getActiveNodes()
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
                //有modal配置就是要打开modal咯
                if (baseAction && baseAction.modalConfig && baseAction.modalConfig.component) {
                    this.openDialog(baseAction.modalConfig, { euGridEvent: event }, nodes[0])
                }
        }

        this.treeEvent.emit(event)
    }

    refresh(params, node?: EuTreeNode, openState?, checkState?, selectedState?) {
        if (node && node.originalNode) {
            (node.originalNode as TreeNode).loadNodeChildren()
        } else if (node && !node.originalNode && node.id) {
            let treeNode: TreeNode = this.nzTree.treeModel.getNodeById(node.id)
            treeNode.loadNodeChildren()
        } else if (!node) {
            this.getNodes(params, null).then(nodes => {
                //认为是初始化加载
                if (!node) {
                    this._nzNodes = nodes
                }
            })
        }
    }

    private getNodes(params, node?: TreeNode): Promise<EuTreeNode[]> {
        let eunode
        if (node) {
            eunode = this.treeNodeToEuTreeNode(node)
            this.autoParams.forEach(value => {
                if (eunode[value]) {
                    params[value] = eunode[value]
                }
            })
        }
        return this.getTreeService().getTreeNodes(this._dataUrl, eunode, params)
    }

    private treeAsyncSuccess(ztree, openState, checkState, selectedState, openNodes, checkedNodes, selectedNodes) {

    }

    refreshActiveNode() {
        var params = this.params
        if (!params) {
            params = {};
        }
        var activeNode = this.getActiveDefNode()
        if (activeNode) {
            this.refresh(params, activeNode, false, false, false);
        } else {
            console.warn("refreshActiveNode while no active node")
            this.refresh(params);
        }
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

    private refreshNode(node: TreeNode, id?: string, pid?: string) {
        node.loadNodeChildren()
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

    getActiveDefNodes(): Array<EuTreeNode> {
        let nodes: TreeNode[] = this.getActiveNodes()
        let rnodes = new Array<EuTreeNode>()
        nodes.forEach(node => {
            let enNodeDef: EuTreeNode = this.treeNodeToEuTreeNode(node)
            rnodes.push(enNodeDef)
        })
        return rnodes
    }

    private getActiveNodes(): Array<TreeNode> {
        // let nodes: TreeNode[] = Object.assign([], this.nzTree.treeModel.getActiveNode())
        let nodes: TreeNode[] = this.nzTree.treeModel.getActiveNodes()
        return nodes
    }

    private checkedLeafNodes: EuTreeNode[] = []
    private checkedParentNodes: EuTreeNode[] = []
    private checkedNodes: EuTreeNode[] = []

    onCheck(e) {
        let euTreeNode = this.treeNodeToEuTreeNode(e.node)
        this.euTreeCheck.emit({
            checked: e.checked,
            eventName: e.eventName,
            euTreeNode: euTreeNode,
            node: e.node
        })
    }

    getCheckedNodes(checked?: boolean): Array<EuTreeNode> {
        // return this.checkedLeafNodes.concat(this.checkedParentNodes)
        this.checkedLeafNodes = []
        this.checkedParentNodes = []
        this.checkedNodes = []
        let nodes: any[] = this.nzTree.treeModel.nodes
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

    private treeNodeToEuTreeNode(node: TreeNode): EuTreeNode {
        let euNodeDef: EuTreeNode = Object.assign({
            id: node.id,
            name: node.data[node.displayField],
        }, node.data)
        if (node.parent) {
            euNodeDef.parent = this.treeNodeToEuTreeNode(node.parent)
        }
        euNodeDef.originalNode = node
        return euNodeDef
    }

}