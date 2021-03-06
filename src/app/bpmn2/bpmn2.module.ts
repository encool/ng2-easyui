import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import {
    EasyUIMdModalModule
    // } from 'ng2-easyui'
} from '../../../widget'

import { EasyUIBpmnModule } from "../../../widget/bpmn2";

import { Bpmn2DemoComponent } from './bpmn2.demo.component';

@NgModule({
    imports: [
        EasyUIBpmnModule,
        RouterModule.forChild([{
            path: "Bpmn2DemoComponent",
            component: Bpmn2DemoComponent,
            data: { title: "Bpmn2流程图" }
        }]),

    ],
    declarations: [
        Bpmn2DemoComponent,
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
    ]
})
export class Bpmn2Module { }