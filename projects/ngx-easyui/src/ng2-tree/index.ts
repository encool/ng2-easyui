import { NgModule } from '@angular/core';
import { TreeModule } from 'ng2-tree';

import { Ng2TreeComponent } from "./ng2-tree.component";

@NgModule({
    imports: [
        TreeModule
    ],
    declarations: [
        Ng2TreeComponent
    ],
    exports: [
        Ng2TreeComponent,
    ]
})
export class EasyUINg2TreeModule {
    
}
export { TreeModel, Ng2TreeSettings, RenamableNode } from 'ng2-tree'