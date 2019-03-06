import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule, MatIconModule } from "@angular/material";
import { Bootstrap3GridModule } from "ng2-bootstrap3-grid";
import { EasyFormCoreModule } from "ngx-easyform";

import { EasyUIAntTreeModule } from "../eu-tree-antd/index";
import { SelectTreeInput, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER } from './select-tree.input';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { MatSelectTreeComponent } from "./select-tree.component";
import { TreeWrapComponent } from "./tree-wrapper";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        EasyUIAntTreeModule,
        Bootstrap3GridModule,
        EasyFormCoreModule
    ],
    declarations: [
        MatSelectTreeComponent,
        SelectTreeInput,
        TreeWrapComponent
    ],
    exports: [
        MatSelectTreeComponent,
        SelectTreeInput
    ],
    entryComponents: [AntdTreeComponent, MatSelectTreeComponent]
})
export class EasyUISelectTreeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyUISelectTreeModule,
            providers: [
                MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER
            ],
        };
    }
}

export { MatSelectTreeField } from './select-tree.field'
export { MatSelectTreeComponent } from './select-tree.component'