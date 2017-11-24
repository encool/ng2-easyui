import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatTabsModule } from "@angular/material";
import { EuTabService } from "./eu-tab.service";
import { TitleGuard } from './title.gard'

import { MatContainerComponent, EuMatTab } from "./mat-container.component";
@NgModule({
    imports: [
        MatTabsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        MatContainerComponent
    ],
    exports: [
        MatContainerComponent
    ]
})
export class EasyUIMatContainerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyUIMatContainerModule,
            providers: [
                EuTabService, TitleGuard
            ]
        };
    }
}

export { MatContainerComponent, EuMatTab, EuTabService }
export { TitleGuard } 
