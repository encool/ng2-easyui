import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { EasyUIagGridModule, EuPageService } from '../../../'
import { EuAggridDemoComponent } from './eu-aggrid.demo.component';
// import { ModalInfoComponent } from '../modal/modal.info.component'

@NgModule({
    imports: [
        EasyUIagGridModule,
        RouterModule.forChild([{
            path: "EuAggridDemoComponent",
            component: EuAggridDemoComponent
        }])
    ],
    declarations: [
        EuAggridDemoComponent,
        // ModalInfoComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        // ModalInfoComponent
    ]
})
export class AggridModule { }