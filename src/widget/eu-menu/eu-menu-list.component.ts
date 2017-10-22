import { Component, OnInit, Input } from '@angular/core';

import { Menu } from "./menu";

@Component({
    selector: 'eu-menu-list',
    template: `
    <div class="menu_section" style="width:230px;">
        <ul cdk-accordion class="nav side-menu">
            <eu-menu *ngFor="let menu of menus" [menu]="menu"></eu-menu>
        </ul>
    </div>
    `
})
export class EuMenuListComponent implements OnInit {

    @Input() menus: Menu[]
    constructor() { }

    ngOnInit() {

    }

}