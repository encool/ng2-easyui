import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    // MatCardModule,
    MatInputModule,
    MatExpansionModule,
} from '@angular/material';
import { AgGridModule } from 'ag-grid-angular/main';
import { AggridComponent } from './aggrid-table.component'

import { EasyFormMdModule } from 'ngx-easyform'

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatSnackBarModule,
        // MatCardModule,
        MatInputModule,
        MatExpansionModule,
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
        AggridComponent
    ]
})
export class EasyUIagGridModule { }

export { AggridComponent } from './aggrid-table.component'
export { ColDef, ColGroupDef, DraggingEvent } from 'ag-grid/main'
