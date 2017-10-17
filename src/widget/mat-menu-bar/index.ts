import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatMenuModule, MatButtonModule, MatExpansionModule,MatIconModule } from "@angular/material";

import { MenuListComponent } from "./menu-list.component";

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        MenuListComponent
    ],
    exports: [
        MenuListComponent
    ]
})
export class EasyUIMatMenuSideBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyUIMatMenuSideBarModule,
            providers: [
                // EuTabService, TitleGuard
            ]
        };
    }
}