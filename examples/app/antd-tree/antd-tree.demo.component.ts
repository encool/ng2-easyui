import { Component, OnInit, ViewChild } from '@angular/core';

import {
    TreeNodeDef, EuTreeOptions
} from 'ng2-easyui'
// } from '../../../widget'


@Component({
    selector: 'antd-tree-demo',
    template: `
    <div class="container">
        <div bsRow>
            <eu-mat-panel bsCol.sm="4">
                <eu-antd-tree #panelcontent_ref
                    (treeEvent)="onTreeEvent($event)"
                    [euTreeOptions]="euTreeOptions"
                    [euTreeNodes]="euTreeNodes">
                </eu-antd-tree>
            </eu-mat-panel>         
        </div>
    </div>
    
    
    `
})
export class AntdTreeDemoComponent implements OnInit {

    euTreeNodes: TreeNodeDef[]
    euTreeOptions: EuTreeOptions
    constructor() {
        this.euTreeOptions = {
            treeId: "demoTree",
            rootNodeName: "root",
            dataUrl: "./nodes.json"
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
}