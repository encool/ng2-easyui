import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TreeModel, Ng2TreeSettings } from 'ng2-tree';


@Component({
    selector: 'eu-ng2-tree',
    template: `
     <tree
      [tree]="ng2TreeNodes"
      [settings]="ng2TreeSettings"
      (nodeRemoved)="handleRemoved($event)"
      (nodeRenamed)="handleRenamed($event)"
      (nodeSelected)="handleSelected($event)"
      (nodeMoved)="handleMoved($event)"
      (nodeCreated)="handleCreated($event)"
      (nodeExpanded)="handleExpanded($event)"
      (nodeCollapsed)="handleCollapsed($event)"
      (loadNextLevel)="handleNextLevel($event)">
    </tree>   
    `,
    styleUrls: ['./ng2-tree.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class Ng2TreeComponent implements OnInit {

    @Input() ng2TreeNodes: TreeModel
    @Input() ng2TreeSettings: Ng2TreeSettings

    constructor() { }

    ngOnInit() {

    }

    handleRemoved($event) {

    }
    handleRenamed($event) {

    }
    handleSelected($event) {

    }
    handleMoved($event) {

    }
    handleCreated($event) {

    }
    handleExpanded($event) {

    }
    handleCollapsed($event) {

    }
    handleNextLevel($event) {

    }

}