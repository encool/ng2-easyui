import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { OnAction, TreeAction, TreeEvent, TreeNodeDef, EuTreeOptions, CURDAction } from "ng2-easyui.core";

import { HttpClient } from "@angular/common/http";

import {
    EuTreeService
} from 'ng2-easyui.core'

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

    @Input() euTreeNodes: TreeNodeDef[] = []
    @Input() euTreeOptions: EuTreeOptions

    @Input() nzShiftSelectedMulti = true;

    @Output() treeEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>()

    @ViewChild(NzTreeComponent) nzTree: NzTreeComponent

    params: any = {}
    autoParams: string[] = ['id']
    nzCheckable = false;
    nzShowLine = true;
    _dataUrl: string
    _nzOptions: any
    _nzNodes: any[]

    constructor(private httpClient: HttpClient, private treeService: EuTreeService) {

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
            getChildren: (node: any) => {
                return this.getNodes(this.params, node)
            }
        }, this.euTreeOptions.otherOptions)

        this.refresh(this.params)
    }

    onEvent(ev: any) {
        console.log('onEvent', ev);
    }

    euOnAction(baseAction: TreeAction) {

        let defnodes = this.getActiveDefNodes()
        let event: TreeEvent = {
            businessId: this.euTreeOptions.treeId,
            activeNodes: defnodes,
            action: baseAction,
        }
        let nodes = this.getActiveNodes()
        if (baseAction.curdType === CURDAction.READ.curdType) {
            if (nodes.length == 1) {
                this.refreshNode(nodes[0])
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

    private getNodes(params, node?): Promise<any> {
        if (node) {
            this.autoParams.forEach(value => {
                if (node[value]) {
                    params[value] = node[value]
                }
            })
        }
        return this.treeService.getTreeNodes(this._dataUrl, params)
    }

    private treeAsyncSuccess(ztree, openState, checkState, selectedState, openNodes, checkedNodes, selectedNodes) {

    }

    refreshSelectedNode() {

    }

    refreshNode(node: TreeNode, id?: string, pid?: string) {
        node.loadNodeChildren()
    }

    getActiveNode(): TreeNodeDef {
        let nodes = this.getActiveNodes()
        if (nodes && nodes.length > 0) {
            return this.getActiveDefNodes()[0]
        } else {
            return null
        }
    }

    getActiveDefNodes(): Array<TreeNodeDef> {
        let nodes: TreeNode[] = this.getActiveNodes()
        let rnodes = new Array<TreeNodeDef>()
        nodes.forEach(node => {
            let enNodeDef: TreeNodeDef = Object.assign({
                id: node.id,
                name: node.data[node.displayField],
            }, node.data)
            rnodes.push(enNodeDef)
        })
        return rnodes
    }

    getActiveNodes(): Array<TreeNode> {
        let nodes: TreeNode[] = this.nzTree.treeModel.activeNodes;
        return nodes
    }

    getCheckedNodes(checked: boolean): Array<TreeNodeDef> {
        return null
    }

    refreshTree() {

    }

}