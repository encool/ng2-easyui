import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EuMenuComponent } from './eu-menu.component';
import { EuMenuListComponent } from "./eu-menu-list.component";

@NgModule({
    imports: [CommonModule],
    declarations: [EuMenuComponent, EuMenuListComponent],
    exports: [EuMenuComponent, EuMenuListComponent],
})
export class EasyUIMenuModule {

}

export * from './menu'