import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgZorroAntdModule } from "ng-zorro-antd";

import { AntSelectTreeComponent } from "./ant-select-tree.component";
import { AntSelectTreeField } from "./ant-select-tree.field";

@NgModule({
    declarations: [AntSelectTreeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    exports: [AntSelectTreeComponent],
    providers: [],
    entryComponents: [AntSelectTreeComponent]
})
export class AntSelectTreeModule { }

export { AntSelectTreeComponent, AntSelectTreeField }