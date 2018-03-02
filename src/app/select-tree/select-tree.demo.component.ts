import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import {
    EuTreeNode, EuTreeOptions
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'
import { AntdTreeComponent, SelectTreeField } from "../../../widget/";

@Component({
    selector: 'antd-tree-demo',
    template: `
    <div bsContainer>
        <div bsRow>
            <eu-tree-select bsCol.sm="4"
                (treeEvent)="onTreeEvent($event)"
                [field]="selectTreeField">
            </eu-tree-select> 
            <div bsCol.sm="12">
                <button mat-button (click)="onClick($event)">点击</button>
                <button mat-button (click)="onCheckClick($event)">点击</button>
            </div>       
        </div>
    </div>

    `
})
export class SelectTreeDemoComponent implements OnInit {

    options = [
        'One',
        'Two',
        'Three'
    ];

    euTreeOptions: EuTreeOptions
    selectTreeField: SelectTreeField

    @ViewChild(AntdTreeComponent) tree: AntdTreeComponent
    constructor() {
        this.euTreeOptions = {
            treeId: "demoTree",
            rootNodeName: "root",
            dataUrl: "./nodes.json",
            // checkEnable: true,
            defaultActionModalConfig: {
                // component: TreeModalComponent,
                title: "测试标题"
            }
        }
        this.selectTreeField = new SelectTreeField({
            key: "test", label: "testname", required: true,
            euTreeOptions: this.euTreeOptions
        })
    }



    ngOnInit() {

    }

    onTreeEvent($event) {
        this
    }

    onClick(e) {
        let node: EuTreeNode = this.tree.getActiveDefNode()
        this.tree.refresh({}, node)
    }

    onCheckClick(e) {
        debugger
        let nodes = this.tree.getCheckedNodes(true)
    }
}