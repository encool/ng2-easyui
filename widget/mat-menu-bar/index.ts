import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import {
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
} from "@angular/material";

import { MenuListComponent } from "./menu-list.component";
import { MatNavMenuComponent } from "./mat-nav-menu.component";
// import { EuMatMenuTrigger } from "./eu-menu.trigger";

@NgModule({
    imports: [
        CommonModule,
        // MatMenuModule,
        MatButtonModule,
        // MatExpansionModule,
        MatIconModule,
        MatListModule,
    ],
    declarations: [
        // EuMatMenuTrigger,
        MenuListComponent,
        MatNavMenuComponent,
    ],
    exports: [
        MenuListComponent,
        MatNavMenuComponent,
        // EuMatMenuTrigger
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