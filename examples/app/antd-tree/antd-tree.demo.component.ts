import { Component, OnInit } from '@angular/core';

import {

} from 'ng2-easyui'
// } from '../../../widget'


@Component({
    selector: 'antd-tree-demo',
    template: `
    <div class="container">
        <div bsRow>
            <eu-mat-panel bsCol.sm="4">
                <eu-antd-tree 
                    [nzNodes]="nodes"
                    [nzCheckable]="true">
                </eu-antd-tree>
            </eu-mat-panel>         
        </div>
    </div>
    
    
    `
})
export class AntdTreeDemoComponent implements OnInit {

    nodes: any[]
    constructor() {
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [
                    { id: 2, name: 'child1' },
                    { id: 3, name: 'child2' }
                ]
            },
            {
                id: 4,
                name: 'root2',
                children: [
                    { id: 5, name: 'child2.1' },
                    {
                        id: 6,
                        name: 'child2.2',
                        children: [
                            { id: 7, name: 'subsub' }
                        ]
                    }
                ]
            }
        ];
    }

    ngOnInit() {

    }

}