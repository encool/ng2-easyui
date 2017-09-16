import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MdButtonModule,
    MdIconModule,
    MdPaginatorModule,
    MdTooltipModule,
    MdSnackBarModule,
    // MdCardModule,
    MdInputModule,
    MdExpansionModule,
} from '@angular/material';
import { AgGridModule } from 'ag-grid-angular/main';
import { AggridComponent } from './aggrid-table.component'

import { EasyFormMdModule } from 'ng2-easyform'

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdIconModule,
        MdPaginatorModule,
        MdTooltipModule,
        MdSnackBarModule,
        // MdCardModule,
        MdInputModule,
        MdExpansionModule,
        EasyFormMdModule,
        AgGridModule.withComponents([]),
    ],
    exports: [
        AggridComponent,
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
export { ColDef, ColGroupDef } from 'ag-grid/main'
