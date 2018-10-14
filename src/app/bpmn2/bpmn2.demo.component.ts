import { Component } from '@angular/core';

import {
    ModelInput
} from 'ngx-easyui/bpmn2'
// } from '../../../widget/bpmn2'


@Component({
    selector: 'bpmn2-demo',
    template: `
    <bpmn-editor [model]="model"></bpmn-editor>
    `,
})
export class Bpmn2DemoComponent {

    model: ModelInput
    constructor() {
        this.model = {
            params: { type: 'add' }
        }
    }
}