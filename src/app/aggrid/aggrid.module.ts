import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import {
    EasyUIMdModalModule
} from 'ngx-easyui'
// } from '../../../widget'

import { EasyUIagGridModule } from "ngx-easyui/eu-ag-grid";

import { EuAggridDemoComponent } from './eu-aggrid.demo.component';
import { ModalInfoComponent } from './modal.info.component'
import { EasyFormCoreModule, EasyFormMdModule, MdTextinputField } from 'ngx-easyform'

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