import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Menu } from "./menu";

@Component({
    selector: 'eu-menu',
    templateUrl: 'eu-menu.component.html',
    host: {
        '[class.collapse in]': 'expanded',
        '[class.collapse]': '!expanded',
    },
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({ height: '0px', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ],
})
export class EuMenuComponent {

    @Input() menu: Menu

    active: boolean
    hasChildren: boolean
    expended: boolean

    constructor() {

    }
}