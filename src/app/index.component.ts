import { Component } from '@angular/core';


@Component({
    selector: 'index-app',
    template: `
    <div style="
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;">
        <div style="
        display: flex;
        flex-direction: row;
        justify-content: center;">
            <button md-raised-button routerLink="/demo/EuAggridDemoComponent">aggrid</button>
            <button md-raised-button routerLink="/RichSwipeDemoComponent">swipe</button>
            <button md-raised-button routerLink="/Bpmn2DemoComponent">bpmn2</button>
        </div>
    </div>
`,
})
export class IndexComponent {
    constructor() {

    }
}