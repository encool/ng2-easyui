import { Component, OnInit, Input } from '@angular/core';

import { Menu } from "./menu";

@Component({
    selector: 'eu-mat-nav-menu',
    templateUrl: 'mat-nav-menu.component.html'
})
export class MatNavMenuComponent implements OnInit {
    @Input() menu: Menu

    constructor() { }

    ngOnInit() {
        this.menu
        debugger
    }

    menuClick() {

    }

}