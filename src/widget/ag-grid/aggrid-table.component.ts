import { Component, Input, ViewChild, OnInit, Type } from "@angular/core";
import { PageEvent, MdPaginator, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { GridOptions, IDatasource, IDateParams, IGetRowsParams, ColDef } from "ag-grid/main";
// import { StyledComponent } from "./styled-render.component";

import { EuPageService, EuGridOptions, EuColModel, GridApi, EuGridAction } from '../../core/'

import { localeText } from './aggrid-local'

@Component({
    selector: 'eu-aggrid',
    templateUrl: './aggrid-table.component.html',
    styles: []
})
export class AggridComponent implements GridApi, OnInit {
    @Input() euColModels: EuColModel[]
    @Input() euGridOptions: EuGridOptions

    @Input() agGridColDefs: ColDef[]
    @Input() rowModelType: string = 'inMemory' //{inMemory, infinite, viewport, enterprise}

    aggridOptions: GridOptions;

    myDataSource: IDatasource

    @Input() url: string = 'ls/list/form/webdiscategorymanage' //'list/e/webdisplaycategory'
    rowData: any[] = []
    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];
    pageIndex: number = 1
    cond: any

    lastRow: number = 0
    cacheBlockSize: number = 10

    @ViewChild(MdPaginator) paginator: MdPaginator;
    pageEvent: PageEvent

    defaultAtcions = {
        [EuGridAction.TYPE_CREATE]: {
            icon: 'add',
            "style": "basic"
        },
        [EuGridAction.TYPE_UPDATE]: {
            icon: 'mode_edit',
            "style": "primary"
        },
        [EuGridAction.TYPE_QUERY]: {
            icon: 'search',
            "style": "accent"
        },
        [EuGridAction.TYPE_READ]: {
            icon: 'sync',
            "style": "accent"
        },
        [EuGridAction.TYPE_DELETE]: {
            icon: 'delete_forever',
            "style": "warn"
        },
    }
    // MdPaginator Output
    // pageEvent: PageEvent;
    constructor(private pageService: EuPageService, public dialog: MdDialog) {
        let cacheBlockSize = this.cacheBlockSize
        //infinite 模式使用
        this.myDataSource = {
            // Callback the grid calls that you implement to fetch rows from the server. See below for params.
            getRows(params: IGetRowsParams) {
                // debugger
                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
                // To make the demo look real, wait for 500ms before returning
                // pageService.getPageObol("/ls/list/form/webdiscategorymanage", params.startRow, cacheBlockSize).toPromise().then(data => {
                pageService.getPageObByOffsetLimit("list/e/webdisplaycategory", params.startRow, cacheBlockSize).toPromise().then(data => {
                    var lastRow = -1;
                    if (data.total <= params.endRow) {
                        lastRow = data.total;
                    }
                    params.successCallback(data.contents, lastRow);
                })

            }
        }

    }

    ngOnInit() {
        this.aggridOptions = <GridOptions>{

            columnDefs: this.createColumnDefs(),
            rowModelType: this.rowModelType,
            datasource: this.myDataSource,
            rowData: this.rowData,
            domLayout: 'autoHeight', //不出现上下滚动条

            cacheBlockSize: this.cacheBlockSize,
            enableServerSideFilter: true,
            enableColResize: true,
            // pagination: true,
            localeText: localeText,
            enableSorting: true,
            enableFilter: true,
            suppressRowClickSelection: true,
            groupSelectsChildren: true,
            // debug: true,
            rowSelection: 'multiple',
            getRowNodeId: (data) => {
                // debugger
                return data[this.euGridOptions.primaryKey]
            }

            // rowGroupPanelShow: 'always',
            // pivotPanelShow: 'always',
            // enableRangeSelection: true,
            // autoGroupColumnDef: groupColumn,
            // defaultColDef: {
            //     editable: true,
            //     enableRowGroup: true,
            //     enablePivot: true,
            //     enableValue: true
            // }
        };
        // debugger
        this.url = this.euGridOptions.url

    }

    ngAfterViewInit() {
        // debugger
        this.paginator.page.subscribe(data => {
            // debugger
            this.pageSize = this.paginator.pageSize
            this.pageIndex = this.paginator.pageIndex
            this.pageService.getPage(this.url, this.pageSize, this.pageIndex + 1, this.cond).then(data => {
                this.length = data.total
                this.rowData = data.contents
                this.aggridOptions.api.setRowData(this.rowData);
                // this.rowData = data
            })

        })
    }

    gridReady($event) {
        // debugger
        this.aggridOptions.api.sizeColumnsToFit()
        // debugger
        if (this.rowModelType == 'inMemory') {
            this.pageService.getPage(this.url, this.pageSize, this.pageIndex, this.cond).then(data => {
                this.length = data.total
                this.rowData = data.contents
                this.aggridOptions.api.setRowData(this.rowData);
                // this.rowData = data
            })
        }
    }

    private createColumnDefs() {
        if (this.euColModels) {
            let colDefs: ColDef[]
            this.euColModels.forEach(value => {
                // colDefs
            })
            return colDefs;
        } else {
            return this.agGridColDefs
        }
    }

    openDialog(component: Type<any>, data: any): void {
        let dialogRef = this.dialog.open(component, {
            // width: '250px',
            position: {
                top: "120px"
            },
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.refresh()
            // this.animal = result;
        });
    }

    onAction(action: EuGridAction) {
        // debugger
        switch (action.curdType) {
            case EuGridAction.TYPE_CREATE:
                let component = action.component || this.euGridOptions.defaultActionComponent
                this.openDialog(component, { type: action.curdType })
                break
            case EuGridAction.TYPE_UPDATE:
                let component1 = action.component || this.euGridOptions.defaultActionComponent
                this.openDialog(component1, { type: action.curdType })
                break
            case EuGridAction.TYPE_QUERY:
                break
            case EuGridAction.TYPE_READ:
                this.refresh()
                break
            case EuGridAction.TYPE_DELETE:
                break
            default:
        }
    }

    refresh() {

    }

    addParams: (params, fresh?: boolean) => void
    removeParam: (paramName, fresh?) => void

    setParams: (params, fresh?) => void

    // getDataIDs = function () {
    //     return this.jqgridObject.jqGrid("getDataIDs");
    // }
    //获取指定列的数据 rowId:主列的值;如果rowId为空，则返回表格全部数据。
    getRowData = (rowId) => {
        return this.aggridOptions.api.getRowNode(rowId)
    }
    //获取表格信息。param:"rowNum"-每页记录条数 "page"-当前第几页 “records”-总共有多少条
    // getGridParam = function (param) {
    //     return this.jqgridObject.jqGrid("getGridParam", param);
    // }
    //获取单个选中的行的主列值，如果选中多个这返回最后选中的值
    getSingleSelectedRowId = () => {
        return this.getSingleSelectedData[this.euGridOptions.primaryKey]
    }
    //获取所有选中的行的主列值，返回数组
    getSelectedRowIds = () => {
        let ids: any[]
        let datas: any[] = this.aggridOptions.api.getSelectedRows()
        datas.forEach(v => {
            ids.push(v.this.euGridOptions.primaryKey)
        })
        return ids
    }
    //返回单个选中的行数据
    getSingleSelectedData = () => {
        let datas: any[] = this.aggridOptions.api.getSelectedRows()
        return datas[0]
    }
    //返回所有选中行数据的数组
    getSelectedDatas = () => {
        return this.aggridOptions.api.getSelectedRows()
    }
    private convertMap = {
        headerName: "headerName",
        field: "field",

    }
    private enColModelToAgColDef(col: EuColModel): ColDef {
        let colDef: ColDef = {
            headerName: "编号",
            field: "categoryNo",

            checkboxSelection: function (params) {
                // we put checkbox on the name if we are not doing grouping
                return params.columnApi.getRowGroupColumns().length === 0;
            },
            headerCheckboxSelection: function (params) {
                // we put checkbox on the name if we are not doing grouping
                return params.columnApi.getRowGroupColumns().length === 0;
            },
            // filterParams: { newRowsAction: 'keep' },     
            // width: 400,
            // pinnedRowCellRendererFramework: StyledComponent,
            // pinnedRowCellRendererParams: {
            //     style: { 'font-weight': 'bold' }
            // }
        }
        return colDef
    }

}