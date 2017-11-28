import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MatPanelComponent } from "./mat-panel.component";

import {
    MatToolbarModule,
    MatIconModule
} from "@angular/material";


@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule
    ],
    declarations: [
        MatPanelComponent
    ],
    exports: [
        MatPanelComponent
    ]
})
export class EasyUIMatPanelModule {
    // static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: EasyUIMatPanelModule,
    //         providers: [
    //             // EuTabService, TitleGuard
    //         ]
    //     };
    // }
}