import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatIconModule,
    MatListModule,
} from "@angular/material";
import { CdkAccordionModule } from "@angular/cdk/accordion";

import { EuMenuComponent } from './eu-menu.component';
import { EuMenuListComponent } from "./eu-menu-list.component";

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        CdkAccordionModule,
        // CdkAccordion,
        // AccordionItem,
    ],
    providers: [

    ],
    declarations: [
        EuMenuComponent,
        EuMenuListComponent,
    ],
    exports: [EuMenuComponent, EuMenuListComponent],
})
export class EasyUIMenuModule {
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: EasyUIMenuModule,
    //         providers: [
    //             EuMenuListComponent
    //         ]
    //     };
    // }
}

export * from './menu'