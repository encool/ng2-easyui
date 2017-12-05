import { NgModule } from '@angular/core';

import { NzTreeModule } from 'ng-tree-antd';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AntdTreeComponent } from './antd-tree.component'

@NgModule({
    imports: [
        NzTreeModule,
        NgZorroAntdModule.forRoot()
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
