import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';

import { AngularTreeComponent } from './angular-tree.component'

@NgModule({
    imports: [
        TreeModule
    ],
    declarations: [
        AngularTreeComponent
    ],
    exports: [
        AngularTreeComponent,
    ]
})
export class EasyUIAngularTreeModule { }

export { AngularTreeComponent } from './angular-tree.component'
export { ITreeOptions, TREE_ACTIONS } from "angular-tree-component";