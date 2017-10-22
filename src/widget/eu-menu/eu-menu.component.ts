import { Component, Input, ViewEncapsulation, Optional, ChangeDetectorRef, Host, } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from "@angular/router";

import { AccordionItem, CdkAccordion, } from "@angular/material";
import { UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { Menu } from "./menu";

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
    styleUrls: ['./eu-menu.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class EuMenuComponent extends AccordionItem {

    @Input() menu: Menu

    active: boolean
    hasChildren: boolean
    // expanded: boolean


    constructor(private router: Router,
        @Optional() @Host() accordion: CdkAccordion,
        _changeDetectorRef: ChangeDetectorRef,
        _uniqueSelectionDispatcher: UniqueSelectionDispatcher) {
        super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
        this.accordion = accordion;
    }
    menuClick() {
        if (this.menu.link) {
            this.menu.active = true
            this.router.navigateByUrl(this.menu.link)
        }
        this.expanded = !this.expanded
    }

    _getExpandedState() {
        return this.expanded ? 'expanded' : 'collapsed';
    }

    _getExpandedIcon() {
        return this.expanded ? 'expand_less' : 'expand_more';

    }
}