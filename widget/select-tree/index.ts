import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { EasyUIAntTreeModule } from "../eu-tree-antd/index";
import { SelectTreeTrigger } from './select-tree.trigger';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER } from "./select-tree.trigger";
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";
import { SelectTreeComponent } from "./select-tree.component";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
@NgModule({
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        EasyUIAntTreeModule
    ],
    declarations: [
        SelectTreeComponent,
        SelectTreeTrigger
    ],
    exports: [
        SelectTreeComponent,
        SelectTreeTrigger
    ],
    entryComponents: [AntdTreeComponent]
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