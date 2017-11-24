import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpmnEditorComponent } from './bpmn-editor.component'
import { BpmnViewerComponent } from './bpmn-viewer.component'

@NgModule({
    imports: [
        CommonModule,

    ],
    exports: [
        BpmnEditorComponent,
    ],
    declarations: [
        BpmnEditorComponent,
        BpmnViewerComponent
    ],
    providers: [
    ],
    entryComponents: [
    ]
})
export class EasyUIBpmnModule { }

export { BpmnEditorComponent } from './bpmn-editor.component'
export { ModelInput } from './model.input'