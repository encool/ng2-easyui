import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdButtonModule, MdIconModule, MdPaginatorModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular/main';

import { AggridComponent } from './aggrid-table.component'

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdIconModule,
        MdPaginatorModule,
        AgGridModule,
    ],
    exports: [
        AggridComponent
    ],
    declarations: [
        AggridComponent
    ],
    providers: [

    ],
    entryComponents: [

    ]
})
export class EasyUIagGridModule { }

export * from './aggrid-table.component'
export { ColDef } from 'ag-grid/main'
