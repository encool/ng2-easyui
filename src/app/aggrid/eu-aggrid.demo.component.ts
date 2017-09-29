import { Component, OnInit, NgZone } from '@angular/core';

import { EuGridOptions, EuColModel, EuGridEvent, AggridComponent, ColDef, ColGroupDef } from '../../../'

import { ModalInfoComponent } from './modal.info.component'

import {
    FieldBase,
    MdTextinputField,
    MdTextareaField,
    MdDatepickerField,
    MdSelectField,
    MdFormComponent,
    MdCheckboxField,
    QueryOperate
} from 'ng2-easyform'

@Component({
    selector: 'eu-aggrid-demo',
    template: `
    <eu-aggrid [agGridColDefs]="agGridColDefs" [euGridOptions]="euGridOptions"></eu-aggrid>
    `
})

export class EuAggridDemoComponent implements OnInit {

    // EuColModels: EuColModel[]
    euGridOptions: EuGridOptions
    agGridColDefs: (ColDef | ColGroupDef)[]

    constructor(private _ngZone: NgZone) {

        this.agGridColDefs = [
            // {
            //     headerName: "编号",
            //     field: "categoryNo",
            //     children: [
            //         {
            //             headerName: "categoryNo",
            //             field: "categoryNo",
            //             checkboxSelection: true,
            //             headerCheckboxSelection: true,
            //         },
            //         { headerName: "categoryName", field: "categoryName" },                    
            //     ],
            // },
            {
                headerName: "编号",
                field: "categoryNo",
                checkboxSelection: true,
                headerCheckboxSelection: true,
            },
            { headerName: "名称", field: "categoryName" },
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
            rowNum: 10,
            queryfields: [
                new MdTextinputField({
                    key: "categoryNo",
                    label: "编号",
                    // required: true,
                    span: 4,
                }),
                new MdDatepickerField({
                    key: "categoryName",
                    label: "名称",
                    // required: true,
                    span: 4,
                    op:QueryOperate.cn                     
                }),
                new MdDatepickerField({
                    key: "inTime",
                    label: "入职日期",
                    // required: true,
                    // disabled: true,
                    span: 4,
                }),
            ]
        })
    }

    ngOnInit() { }
}