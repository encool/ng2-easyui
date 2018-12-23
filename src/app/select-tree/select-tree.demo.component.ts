import { Component, OnInit, ViewChild } from '@angular/core';
import {
    EuTreeNode, EuTreeOptions
    // } from 'ng2-easyui'
} from 'ngx-easyui-core'
import { SelectTreeField, SelectTreeComponent } from "ngx-easyui";

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
                <button mat-button (click)="onClick($event)">点击赋值</button>
                <button mat-button (click)="onCheckClick($event)">点击</button>
            </div>       
        </div>
    </div>

    `
})
export class SelectTreeDemoComponent implements OnInit {

    euTreeNodes: EuTreeNode[]

    euTreeOptions: EuTreeOptions
    selectTreeField: SelectTreeField

    @ViewChild(SelectTreeComponent) selectTree: SelectTreeComponent
    constructor() {
        this.euTreeOptions = {
            treeId: "demoTree",
            rootNodeName: "root",
            dataUrl: "./nodes.json",
            checkEnable: true,
            defaultActionModalConfig: {
                // component: TreeModalComponent,
                title: "测试标题"
            }
        }
        this.euTreeNodes = [
            {
                id: "12",
                name: 'root1',
                children: [
                    { id: "2", name: 'child1' },
                    { id: "3", name: 'child2' }
                ]
            },
            {
                id: "4",
                name: 'root2',
                children: [
                    { id: "5", name: 'AyncChildren', hasChildren: true },
                    {
                        id: "6",
                        name: 'child2.2',
                        children: [
                            { id: "7", name: 'subsub' }
                        ]
                    }
                ]
            }
        ];
        this.selectTreeField = new SelectTreeField({
            key: "test", label: "testname", required: true,
            euTreeOptions: this.euTreeOptions,
            euTreeNodes: this.euTreeNodes
        })
    }



    ngOnInit() {

    }

    onTreeEvent($event) {
        this
    }

    onClick(e) {
        this.selectTree.fieldControl.patchValue("12")
    }

    onCheckClick(e) {
        debugger
        this.selectTree.fieldControl.value
    }
}