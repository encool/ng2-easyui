import { NgModule } from '@angular/core';

import { NzTreeModule } from 'ng-tree-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MatSnackBarModule } from "@angular/material";

import { AntdTreeComponent } from './antd-tree.component'

@NgModule({
    imports: [
        NzTreeModule,
        NgZorroAntdModule.forRoot(),
        MatSnackBarModule
    ],
    declarations: [
        AntdTreeComponent
    ],
    exports: [
        AntdTreeComponent,
    ]
})
export class EasyUIAntTreeModule { }

export { AntdTreeComponent } from './antd-tree.component'
