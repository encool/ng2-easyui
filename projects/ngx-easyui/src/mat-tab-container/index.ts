import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatTabsModule } from "@angular/material";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { EuTabService } from "./eu-tab.service";
import { TitleGuard } from './title.gard'

import { MatContainerComponent, EuMatTab } from "./mat-container.component";
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatTabsModule,
        NgZorroAntdModule,
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
