import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatIconModule,
    MatListModule,
    MatExpansionModule
} from "@angular/material";
import { UNIQUE_SELECTION_DISPATCHER_PROVIDER } from "@angular/cdk/collections";

import { EuMenuComponent } from './eu-menu.component';
import { EuMenuListComponent } from "./eu-menu-list.component";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        // CdkAccordion,
        // AccordionItem,
    ],
    providers: [
        UNIQUE_SELECTION_DISPATCHER_PROVIDER
    ],
    declarations: [
        EuMenuComponent,
        EuMenuListComponent,
    ],
    exports: [EuMenuComponent, EuMenuListComponent],
})
export class EasyUIMenuModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyUIMenuModule,
            providers: [
                EuMenuListComponent
            ]
        };
    }
}

export * from './menu'