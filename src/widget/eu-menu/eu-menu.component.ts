import { Component, Input, ViewEncapsulation, Optional, ChangeDetectorRef, Host, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from "@angular/router";

import { AccordionItem, CdkAccordion, } from "@angular/material";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { Menu } from "./menu";

let nextId = 0

@Component({
    selector: 'eu-menu',
    templateUrl: 'eu-menu.component.html',
    animations: [
        trigger('bodyExpansion', [
            state('collapsed', style({ height: '0px', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ],
    host: {
        '[class.eu-expanded]': 'expanded',
        '[class.eu-collapsed]': '!expanded',
        '[class.active]': 'active',
        '[class.child_active]': 'childActived',
    },
    styleUrls: ['./eu-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class EuMenuComponent extends AccordionItem {

    @Input() menu: Menu
    @Output() hideMenu = new EventEmitter<void>();
    @Output() childActive = new EventEmitter<void>();

    readonly id = `eu-menu-${nextId++}`;
    active: boolean
    childActived: boolean = false
    hasChildren: boolean
    // expanded: boolean
    /** Unregister function for _expansionDispatcher. */
    private _removeActiveUniqueSelectionListener: () => void = () => { };
    constructor(private router: Router,
        @Optional() @Host() accordion: CdkAccordion,
        _changeDetectorRef: ChangeDetectorRef,
        _uniqueSelectionDispatcher: UniqueSelectionDispatcher) {
        super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
        this.accordion = accordion;

        this._removeActiveUniqueSelectionListener =
            _uniqueSelectionDispatcher.listen((id: string, type: string) => {
                if (type === "menu_active_dispatcher" && this.id != id) {
                    this.active = false;
                    this.childActived = false
                    this.menu.active = false
                }
            });
    }

    menuClick() {
        if (this.menu.link) {
            this.menu.active = true
            this.active = true
            this._expansionDispatcher.notify(this.id, "menu_active_dispatcher");
            setTimeout(() => {
                this.childActive.emit()
            });
            this.router.navigateByUrl(this.menu.link)

            if (!this.menu.children) {
                this.hideMenu.emit()
            }
        }
        this.expanded = !this.expanded
    }

    onChildActive() {
        this.childActived = true
        this.childActive.emit()
    }

    onHideMenu() {
        this.hideMenu.emit()
    }

    _getExpandedState() {
        return this.expanded ? 'expanded' : 'collapsed';
    }

    _getExpandedIcon() {
        return this.expanded ? 'expand_less' : 'expand_more';

    }
}