import { Component } from '@angular/core';

import { ModelInput } from '../../../'

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