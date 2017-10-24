import {
    Component, OnInit, Input, Output, EventEmitter,
    ViewChildren, QueryList
} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { EuMenuComponent } from "./eu-menu.component";
import { Menu } from "./menu";

@Component({
    selector: 'eu-menu-list',
    template: `
    <div class="menu_section" style="width:230px;">
        <ul cdk-accordion class="nav side-menu">
            <eu-menu *ngFor="let menu of menus" [menu]="menu" (hideMenu)="onHideMenu()"></eu-menu>
        </ul>
    </div>
    `
})
export class EuMenuListComponent implements OnInit {

    @Input() menus: Menu[]
    @Output() hideMenu = new EventEmitter<void>();

    @ViewChildren(EuMenuComponent) childrenMenus: QueryList<EuMenuComponent>;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.clearActive()
                this.activateLink(event.url)
            }
        })
    }

    ngOnInit() {

    }

    activateLink(link: string) {
        this.childrenMenus.forEach(menu => {
            menu.activateLink(link)
        })
    }

    clearActive() {
        this.childrenMenus.forEach(menu => {
            menu.clearActive()
        })
    }

    onHideMenu() {
        this.hideMenu.emit()
    }
}