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
            <button mat-raised-button routerLink="/demo/EuAggridDemoComponent">aggrid</button>
            <button mat-raised-button routerLink="/RichSwipeDemoComponent">swipe</button>
            <button mat-raised-button routerLink="/Bpmn2DemoComponent">bpmn2</button>
            <button mat-raised-button routerLink="/AngTreeDemoComponent">ang-tree</button>
        </div>
    </div>
`,
})
export class IndexComponent {
    constructor() {

    }
}