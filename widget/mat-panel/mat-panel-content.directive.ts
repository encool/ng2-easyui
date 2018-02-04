import { Directive, Host, Optional } from '@angular/core';
import { OnAction } from "ng2-easyui.core";

@Directive({ selector: '[matPanelContent]' })
export class MatPanelContentDirective {
    constructor( @Optional() onAction: OnAction) { }

    onAction() {
        this.onAction
        debugger
    }
}