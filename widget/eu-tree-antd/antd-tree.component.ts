import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Optional } from '@angular/core';
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
    `
})
export class AntdTreeComponent implements OnInit, OnAction {

    @Input() euTreeNodes: EuTreeNode[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Input() nzShiftSelectedMulti = true;

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()

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

        this.refresh(this.params)
    }

    onEvent(ev: any) {
        // console.log('onEvent', ev);
    }

    onNzLoadNodeChildren($event){
        let node:TreeNode = $event.node
        if(node.data.checked){
            (this.nzTree as any).updateCheckState(node,true)
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
        } else if(node && !node.originalNode && node.id){
            let treeNode:TreeNode = this.nzTree.treeModel.getNodeById(node.id)
            treeNode.loadNodeChildren()
        }else if (!node) {
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

    refreshSelectedNode() {

    }

    private refreshNode(node: TreeNode, id?: string, pid?: string) {
        node.loadNodeChildren()
    }

    /**
     * 获取一个选择的node
     */
    getActiveDefNode(): EuTreeNode {
        let nodes = this.getActiveNodes()
        if (nodes && nodes.length > 0) {
            return this.getActiveDefNodes()[0]
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
        // debugger
        // let node: TreeNode = e.node
        // let _this = this
        // function doNode(node: TreeNode) {
        //     if (e.checked) {
        //         if (node.isLeaf) {
        //             _this.checkedLeafNodes.push(_this.treeNodeToEuTreeNode(node))
        //         } else {
        //             _this.checkedParentNodes.push(_this.treeNodeToEuTreeNode(node))
        //             if (node.children) {
        //                 node.children.forEach(value => {
        //                     doNode(value)
        //                 })
        //             }
        //         }
        //     }
        // }
        // doNode(node)
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

                    // if (node.isLeaf) {
                    //     _this.checkedLeafNodes.push(eunode)
                    // } else {
                    //     _this.checkedParentNodes.push(eunode)
                    //     if (node.children) {
                    //         doNodes(node.children)
                    //     }
                    // }
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