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
export class EasyMatContainerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyMatContainerModule,
            providers: [
                EuTabService, TitleGuard
            ]
        };
    }
}

export { MatContainerComponent, EuMatTab, EuTabService }
export { TitleGuard } 
