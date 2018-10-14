import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ContentChild } from '@angular/core';
import { BaseAction, CURDAction, OnAction } from "ngx-easyui-core";

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
    /**
     * By default, toolbars use a neutral background color based on the current theme (light or dark). This can be changed to 'primary', 'accent', or 'warn'
     */
    @Input() color = "primary"
    @Input() height: string
    @Input() minHeight: string
    @Input() title: string = 'panel'

    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger
    @ContentChild("panelcontent_ref") actionConponent: OnAction

    _contentStyle: any
    constructor() { }

    ngOnInit() {
        this._contentStyle = {
            'min-height': this.minHeight || '450px',
            'height': this.height,
            "overflow": "overlay"
        }
    }

    onAction(action: BaseAction) {
        if (this.actionConponent) {
            this.actionConponent.euOnAction(action)
        } else {
            console.log("actionConponent is null,add #panelcontent_ref on component to fix it")
        }
    }

    onMouseenterMore(event) {
        // console.log("over")
        // if (!this.trigger.menuOpen) {
        //     this.trigger.openMenu()
        // }
    }

    onMouseleaveMore(event) {
        // console.log("out")
        // if (this.trigger.menuOpen) {
        //     this.trigger.closeMenu()
        // }
    }
}