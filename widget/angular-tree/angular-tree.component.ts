import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ITreeOptions } from 'angular-tree-component'
import {
    TreeNodeDef
} from 'ng2-easyui.core'

@Component({
    selector: 'eu-angular-tree',
    template: `
    <tree-root class="euangulartree" [nodes]="nodes" [focused]="true" [options]="options"></tree-root>    
    `,
    styleUrls: ['angular-tree.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AngularTreeComponent implements OnInit {

    @Input() nodes: TreeNodeDef[]
    @Input() focused: boolean = false
    @Input() options: ITreeOptions 

    constructor() { }

    ngOnInit() {

    }

}