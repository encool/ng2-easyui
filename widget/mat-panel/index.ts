import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";

import { MatPanelComponent } from "./mat-panel.component";

import {
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
} from "@angular/material";


@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
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