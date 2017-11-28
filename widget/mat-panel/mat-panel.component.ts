import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'eu-mat-panel',
    templateUrl: 'mat-panel.component.html',
    styles: [`.spacer{flex: 1 1 auto;} .panelbar-icon{} .mat-toolbar-single-row{height:50px}
        .eu_panel_content{
            padding:15px;
        }
    `]
})
export class MatPanelComponent implements OnInit {

    @Input() height: string

    _contentStyle: any
    constructor() { }

    ngOnInit() {
        this._contentStyle = {
            'min-height': '450px',
            'height': this.height
        }
    }

}