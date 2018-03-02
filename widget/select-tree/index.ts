import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { Bootstrap3GridModule } from "ng2-bootstrap3-grid";
import { EasyFormCoreModule } from "ng2-easyform";

import { EasyUIAntTreeModule } from "../eu-tree-antd/index";
import { SelectTreeInput, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER } from './select-tree.input';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { SelectTreeComponent } from "./select-tree.component";
import { TreeWrapComponent } from "./tree-wrapper";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        EasyUIAntTreeModule,
        Bootstrap3GridModule,
        EasyFormCoreModule
    ],
    declarations: [
        SelectTreeComponent,
        SelectTreeInput,
        TreeWrapComponent
    ],
    exports: [
        SelectTreeComponent,
        SelectTreeInput
    ],
    entryComponents: [AntdTreeComponent, SelectTreeComponent]
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

export { SelectTreeField } from './select-tree.field'
export { SelectTreeComponent } from './select-tree.component'