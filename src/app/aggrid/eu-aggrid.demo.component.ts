import { Component, OnInit, NgZone } from '@angular/core';

import { EuGridOptions, EuColModel, EuGridEvent, AggridComponent, ColDef } from '../../../'

import { ModalInfoComponent } from '../modal/modal.info.component'

@Component({
    selector: 'eu-aggrid-demo',
    template: `
    <eu-aggrid [agGridColDefs]="agGridColDefs" [euGridOptions]="euGridOptions"></eu-aggrid>
    `
})

export class EuAggridDemoComponent implements OnInit {

    // EuColModels: EuColModel[]
    euGridOptions: EuGridOptions
    agGridColDefs: ColDef[]

    constructor(private _ngZone: NgZone) {

        this.agGridColDefs = [
            {
                headerName: "编号",
                field: "categoryNo",
                checkboxSelection: true,
                headerCheckboxSelection: true,
                // filterParams: { newRowsAction: 'keep' },     
                // width: 400,
                // pinnedRowCellRendererFramework: StyledComponent,
                // pinnedRowCellRendererParams: {
                //     style: { 'font-weight': 'bold' }
                // }
            },
            {
                headerName: "名称",
                field: "categoryName",
                // width: 399,
                // pinnedRowCellRendererFramework: StyledComponent,
                // pinnedRowCellRendererParams: {
                //     style: { 'font-style': 'italic' }
                // }
            },
            {
                headerName: "URL",
                field: "url",
                // width: 399,
                // pinnedRowCellRendererFramework: StyledComponent,
                // pinnedRowCellRendererParams: {
                //     style: { 'font-style': 'italic' }
                // }
            },
        ]
        this.euGridOptions = new EuGridOptions({
            primaryKey: "id",
            gridId: "aggriddemo",
            title: "表格示例",
            defaultActionComponent: ModalInfoComponent,
            // url: 'list/e/webdisplaycategory',
            url: "ls/list/form/webdiscategorymanage",
            defaultaction: true,
            rowNum: 10
        })
    }

    ngOnInit() { }
}