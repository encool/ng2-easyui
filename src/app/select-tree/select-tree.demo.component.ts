import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import {
    EuTreeNode, EuTreeOptions
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'
import { AntdTreeComponent } from "../../../widget/";

@Component({
    selector: 'antd-tree-demo',
    template: `
    <div bsContainer>
        <div bsRow>
            <eu-tree-select bsCol.sm="4"
                (treeEvent)="onTreeEvent($event)"
                [euTreeOptions]="euTreeOptions"
                [euTreeNodes]="euTreeNodes">
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

    myControl: FormControl = new FormControl();

    options = [
        'One',
        'Two',
        'Three'
    ];

    euTreeNodes: EuTreeNode[]
    euTreeOptions: EuTreeOptions

    @ViewChild(AntdTreeComponent) tree: AntdTreeComponent
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
                    { id: "5", name: 'child2.1' },
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
    }



    ngOnInit() {

    }

    onTreeEvent($event) {
        this
        debugger
    }

    onClick(e) {
        let node: EuTreeNode = this.tree.getActiveDefNode()
        this.tree.refresh({}, node)
    }

    onCheckClick(e) {
        let nodes = this.tree.getCheckedNodes(true)
        debugger
    }
}