import { Component, OnInit, Input } from '@angular/core';
import { OnAction, TreeAction, TreeEvent, TreeNodeDef } from "../core";

@Component({
    selector: 'eu-antd-tree',
    template: `
    <nz-tree 
        [nzNodes]="nzNodes"
        [nzOptions]="nzOptions"
        [nzCheckable]="nzCheckable"
        (nzEvent)="onEvent($event)">
    </nz-tree>
    `
})
export class AntdTreeComponent implements OnInit, OnAction {

    @Input() nzNodes: any[];
    @Input() nzCheckable = false;
    @Input() nzShowLine = false;
    @Input() nzOptions: any = {
        allowDrag: true
    }
    @Input() nzShiftSelectedMulti = true;

    constructor() { }

    ngOnInit() {
        this.nzNodes
        this.nzOptions
    }

    onEvent(ev: any) {
        console.log('onEvent', ev);
    }

    euOnAction(baseAction: TreeAction) {

    }

    refresh(params, openState?, checkState?, selectedState?, node?) {

    }

    private treeAsyncSuccess(ztree, openState, checkState, selectedState, openNodes, checkedNodes, selectedNodes) {

    }

    refreshSelectedNode() {

    }

    refreshNode(node, id?: string, pid?: string) {

    }

    getSelectedNodes(): Array<any> {
        return null
    }

    getCheckedNodes(checked: boolean): Array<any> {
        return null
    }

    refreshTree() {

    }

}