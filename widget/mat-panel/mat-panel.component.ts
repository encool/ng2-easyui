import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ContentChild } from '@angular/core';
import { BaseAction, CURDAction, OnAction } from "ng2-easyui.core";

import { MatMenuTrigger } from "@angular/material";

@Component({
    selector: 'eu-mat-panel',
    templateUrl: 'mat-panel.component.html',
    styles: [`.spacer{flex: 1 1 auto;} .panelbar-icon{padding: 0 14px;} .mat-toolbar-single-row{height:50px}
        .eu_panel_content{
            padding:15px;
        }
        .panelActionMenu{
            width: 80px;
            min-width: 80px;            
        }
        .panelActionMenu .mat-menu-item{
            line-height: 28px;
            height: 28px;  
            padding: 0 8px;  
            font-size: 12px;     
        }     
        .panelActionMenu .mat-menu-item .mat-icon {
            margin-right: 5px;
            font-size: 18px;
            height: 18px;
            width: 18px;
        }           
    `],
    encapsulation: ViewEncapsulation.None
})
export class MatPanelComponent implements OnInit {

    @Input() actions: BaseAction[] = [CURDAction.CREATE, CURDAction.UPDATE, CURDAction.READ]
    @Input() height: string

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger
    @ContentChild("panelcontent_ref") actionConponent: OnAction

    _contentStyle: any
    constructor() { }

    ngOnInit() {
        this._contentStyle = {
            'min-height': '450px',
            'height': this.height
        }
    }

    onAction(action: BaseAction) {
        this.actionConponent.euOnAction(action)
    }

    onMouseenterMore(event) {
        console.log("over")
        if (!this.trigger.menuOpen) {
            this.trigger.openMenu()
        }
    }

    onMouseleaveMore(event) {
        console.log("out")
        if (this.trigger.menuOpen) {
            this.trigger.closeMenu()
        }
    }
}