import { Component, OnInit, Input } from '@angular/core';

import { Menu } from "./menu";

@Component({
    selector: 'eu-menu-list',
    template: `
    <div class="menu_section">
        <ul class="nav side-menu" aria-expanded="true" [class.collapse_in]="expanded">
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