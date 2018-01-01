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
        (nzEvent)="onEvent($event)">
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
        // this._nzNodes = this.euTreeNodes
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
        console.log('onEvent', ev);
    }

    openDialog(modalConfig: ModalConfig, data: any, node: TreeNode): void {
        if (!modalConfig.data) {
            modalConfig.data = {}
        }
        Object.assign(modalConfig.data, data)
        this.euModalService.open(modalConfig, (result) => {
            if (node.parent) {
                this.refreshNode(node.parent)
            }
        }, (result) => {
            if (node.parent) {
                this.refreshNode(node.parent)
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
                let modalConfig = baseAction.modalConfig || this.euTreeOptions.defaultActionModalConfig
                if (modalConfig) {
                    this.openDialog(modalConfig, {
                        euTreeEvent: event
                    }, nodes[0])
                }
                break
            case CURDAction.TYPE_UPDATE:
                if (defnodes.length == 1) {
                    let modalConfig1 = baseAction.modalConfig || this.euTreeOptions.defaultActionModalConfig
                    if (modalConfig1) {
                        this.openDialog(modalConfig1, { euTreeEvent: event }, nodes[0])
                    }
                } else {
                    this.snackBar.open('请选择一条记录！', '关闭', {
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
                if (baseAction && baseAction.modalConfig) {
                    this.openDialog(baseAction.modalConfig, { euGridEvent: event }, nodes[0])
                }
        }

        this.treeEvent.emit(event)
    }

    refresh(params, node?, openState?, checkState?, selectedState?) {
        this.getNodes(params, node).then(nodes => {
            //认为是初始化加载
            if (!node) {
                this._nzNodes = nodes
            }
        })
    }

    private getNodes(params, node?: TreeNode): Promise<any> {
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

    refreshNode(node: TreeNode, id?: string, pid?: string) {
        node.loadNodeChildren()
    }

    getActiveNode(): EuTreeNode {
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

    getActiveNodes(): Array<TreeNode> {
        let nodes: TreeNode[] = this.nzTree.treeModel.activeNodes;
        return nodes
    }

    getCheckedNodes(checked: boolean): Array<EuTreeNode> {
        return null
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
        return euNodeDef
    }

}