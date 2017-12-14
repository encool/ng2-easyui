import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import {
    EasyUIMdModalModule
    // } from 'ng2-easyui'
} from '../../../widget'

import { EasyUIagGridModule } from "../../../widget/eu-ag-grid";

import { EuAggridDemoComponent } from './eu-aggrid.demo.component';
import { ModalInfoComponent } from './modal.info.component'
import { EasyFormCoreModule, EasyFormMdModule, MdTextinputField } from 'ng2-easyform'

@NgModule({
    imports: [
        EasyUIagGridModule,
        RouterModule.forChild([{
            path: "EuAggridDemoComponent",
            component: EuAggridDemoComponent,
            data: { title: "aggrid" }
        }]),
        EasyUIMdModalModule.withComponents([ModalInfoComponent]),
        EasyFormCoreModule,
        EasyFormMdModule
    ],
    declarations: [
        EuAggridDemoComponent,
        ModalInfoComponent
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        // ModalInfoComponent
    ]
})
export class AggridModule { }