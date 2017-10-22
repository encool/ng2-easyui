import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatIconModule,
    MatListModule,
    CdkAccordion,
    AccordionItem,
} from "@angular/material";
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER } from "@angular/cdk/collections";

import { EuMenuComponent } from './eu-menu.component';
import { EuMenuListComponent } from "./eu-menu-list.component";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        // CdkAccordion,
        // AccordionItem,
    ],
    providers: [
        AccordionItem,
        UNIQUE_SELECTION_DISPATCHER_PROVIDER
    ],
    declarations: [
        CdkAccordion,
        EuMenuComponent,
        EuMenuListComponent,
    ],
    exports: [EuMenuComponent, EuMenuListComponent],
})
export class EasyUIMenuModule {

}

export * from './menu'