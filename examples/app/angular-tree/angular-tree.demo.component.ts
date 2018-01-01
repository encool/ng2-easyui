import { Component, OnInit } from '@angular/core';

import {
    ITreeOptions, TREE_ACTIONS
} from 'ng2-easyui'
// } from '../../../widget'
import {
    EuTreeNode
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'

@Component({
    selector: 'ang-tree-demo',
    template: `
    <div class="container">
        <div bsRow>
            <eu-mat-panel bsCol.sm="4">
                <eu-angular-tree  [nodes]="nodes" [options]="options"></eu-angular-tree>
            </eu-mat-panel>         
        </div>
    </div>
    
    
    `
})
export class AngTreeDemoComponent implements OnInit {

    nodes: EuTreeNode[]
    options: ITreeOptions

    constructor() { }

    ngOnInit() {
        this.nodes = [
            {
                id: "1",
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

        this.options = {
            displayField: 'name',
            isExpandedField: 'expanded',
            // idField: 'uuid',
            actionMapping: {
                mouse: {
                    dblClick: (tree, node, $event) => {
                        if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
                    }
                }
            },
            nodeHeight: 23,
            allowDrag: (node) => {
                return true;
            },
            allowDrop: (node) => {
                return true;
            },
            useVirtualScroll: true,
            animateExpand: true,
            animateSpeed: 30,
            animateAcceleration: 1.2
        }
    }

}