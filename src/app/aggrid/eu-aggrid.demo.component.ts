import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
    EuGridOptions,
     EuColModel, 
     EuGridEvent, 
     ModalConfig, 
     CURDAction,
     EuGridAction,
     TreeAction,
     EuTreeNode
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'
import {
    AggridComponent, ColDef, ColGroupDef,
    // } from 'ng2-easyui/eu-ag-grid'
} from '../../../widget/eu-ag-grid'

import { IndexComponent } from "../index.component";
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
    <eu-aggrid [agGridColDefs]="agGridColDefs" [euGridOptions]="euGridOptions"
        (rowDragEnd)="OnRowDragEnd($event)"></eu-aggrid>
    <div bsCol.sm="8">
    <button mat-button (click)="onClick($event)">点击</button>
    </div>    
    `
})

export class EuAggridDemoComponent implements OnInit {

    // EuColModels: EuColModel[]
    euGridOptions: EuGridOptions
    agGridColDefs: (ColDef | ColGroupDef)[]
    @ViewChild(AggridComponent) gridComponent: AggridComponent

    constructor(private activatedRoute: ActivatedRoute, private indexComponent: IndexComponent) {
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
                rowDrag: true,
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
            defaultActionModalConfig: {
                component: ModalInfoComponent
            },
            actions: [
                CURDAction.CREATE,
                CURDAction.UPDATE,
                CURDAction.DELETE,
                CURDAction.READ,
                { key: "sortuser", name: "排序", icon: "reorder", style: "basic" },
                { key: "setrole", name: "设置角色", icon: "assignment_ind", style: "primary" }
            ],
            // url: 'list/e/webdisplaycategory',
            url: "ls/list/form/webdiscategorymanage",
            defaultaction: true,
            rowNum: 10,
            rowDragManaged: true,
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
                    op: QueryOperate.cn
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
        this.indexComponent.openedChange.subscribe((data) => {
            this.gridComponent.reComputeSize()
        })
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            // debugger
        });
    }
    onTreeEvent(e) {
        let action: TreeAction = e.action
        let nodes: EuTreeNode[] = e.activeEuNodes
        let ids = []
        nodes.forEach(node => {
            ids.push(node.id)
        })
        if (nodes.length > 0) {
            switch (action) {
                case CURDAction.CREATE:
                    // this.addRes()
                    break;
                case CURDAction.DELETE:
                    break;
                default:
            }
        }
    }
    onClick(e) {
        // this.gridComponent.setActionParams("all", { orgId: "11" })
        // this.gridComponent.toggleSuppressRowDrag()
        let ids = this.gridComponent.getRowDataIds();
    }

    OnRowDragEnd(event) {
        let datas = this.gridComponent.getRowDatas()
    }
}