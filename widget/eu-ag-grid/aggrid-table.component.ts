import { Component, Input, Output, EventEmitter, ViewChild, OnInit, Type, ViewEncapsulation, Optional } from "@angular/core";
import { PageEvent, MatPaginator, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { GridOptions, IDatasource, IDateParams, IGetRowsParams, ColDef, ColGroupDef, RowNode } from "ag-grid/main";
import { debounce } from 'rxjs/operators'
import { Observable, } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'

import {
    EuGridOptions,
    EuColModel,
    GridApi,
    EuGridAction,
    EuGridEvent,
    ModalConfig,
    Conditions,
    Rule,
} from 'ng2-easyui.core'
import { EuModalService } from "ng2-easyui.core";
import { EuPageService } from "ng2-easyui.core";

import { localeText } from './aggrid-local'
import {
    FieldBase,
    MdFormComponent,
    QueryOperate
} from 'ng2-easyform'

// import * as _ from "lodash"

@Component({
    selector: 'eu-aggrid',
    templateUrl: './aggrid-table.component.html',
    //     styles: [
    //         `   
    // .eu-md-table-container {
    //     transition: box-shadow 280ms cubic-bezier(.4,0,.2,1);
    //     display: block;
    //     position: relative;
    //     /* padding: 24px; */
    //     border-radius: 2px;
    //     background: #fff;
    //     color: rgba(0,0,0,.87);
    //     box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);    
    // }
    // `,
    //     ],
    styleUrls: ["./aggrid-table.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class AggridComponent implements GridApi, OnInit {
    @Input() euColModels: EuColModel[]
    @Input() euGridOptions: EuGridOptions

    @Input() agGridColDefs: (ColDef | ColGroupDef)[]
    @Input() rowModelType: string = 'inMemory' //{inMemory, infinite, viewport, enterprise}

    @Input() inputPageService: EuPageService

    aggridOptions: GridOptions;

    myDataSource: IDatasource

    @Input() url: string = 'ls/list/form/webdiscategorymanage' //'list/e/webdisplaycategory'
    rowData: any[] = []
    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];
    pageIndex: number = 1
    // cond: any
    sidx: string
    sord: string
    queryExpanded: boolean = false
    @Input() tableWidth: string = "100%"
    queryfields: FieldBase<any>[]

    //表格的初始化参数
    @Input() originParams: any = {}
    //初始化的查询参数
    @Input() originQueryParams: any = {}
    private _queryParams: any = {}

    lastRow: number = 0
    cacheBlockSize: number = 10

    @ViewChild(MatPaginator) paginator: MatPaginator
    @ViewChild(MdFormComponent) queryForm: MdFormComponent
    pageEvent: PageEvent
    @Output() euGridEvent: EventEmitter<EuGridEvent> = new EventEmitter<EuGridEvent>()

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
    constructor(
        private euModalService: EuModalService,
        @Optional() private pageService: EuPageService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
        let cacheBlockSize = this.cacheBlockSize
        //infinite 模式使用
        this.myDataSource = {
            // Callback the grid calls that you implement to fetch rows from the server. See below for params.
            getRows(params: IGetRowsParams) {

                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
                // To make the demo look real, wait for 500ms before returning
                // pageService.getPageObol("/ls/list/form/webdiscategorymanage", params.startRow, cacheBlockSize).toPromise().then(data => {
                this.getPageService().getPageObByOffsetLimit("list/e/webdisplaycategory", params.startRow, cacheBlockSize).toPromise().then(data => {
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
        this.queryfields = this.euGridOptions.queryfields
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
            suppressRowClickSelection: false,
            suppressCellSelection: true,
            groupSelectsChildren: true,
            // debug: true,
            rowSelection: 'multiple',
            getRowNodeId: (data) => {

                return data[this.euGridOptions.primaryKey]
            },

        };

        this.url = this.euGridOptions.url
        if (this.euGridOptions.width) {
            this.tableWidth = this.euGridOptions.width + 'px'
        }
    }

    ngAfterViewInit() {

        this.paginator.page.subscribe(data => {

            this.pageSize = this.paginator.pageSize
            this.pageIndex = this.paginator.pageIndex + 1
            this.refreshData(this.url, this.pageSize, this.pageIndex, this.cond, this.sidx, this.sord)
        })

        // this.queryForm.form.valueChanges.debounce(() => Observable.interval(400)).subscribe(value => {
        //     this.query()
        // })
        this.queryForm.form.valueChanges.pipe(
            debounce(() => Observable.interval(400))
        ).subscribe(value => {
            this.query()
        })

        //初始化的查询参数
        this.queryForm.form.patchValue(this.originQueryParams)
    }

    private get cond() {
        return Object.assign({}, this.originParams, this.originQueryParams, this._queryParams)
    }

    query($event?) {
        // debugger
        this._queryParams = this.queryForm.form.value
        for (let key in this._queryParams) {
            if (this._queryParams[key] == undefined || this._queryParams[key] == "") {
                delete this._queryParams[key]
            }
        }
        let queryParams = {}
        Object.assign(queryParams, this.originParams, this._queryParams, this.originQueryParams)

        this.doQueryParams(queryParams, this.queryfields)
        this.refresh(queryParams)
    }

    reset($event?) {
        this.queryForm.form.reset()
        this.queryForm.form.patchValue(this.originQueryParams)
        this._queryParams = this.queryForm.form.value

        this.refresh(this.cond)
    }

    private doQueryParams(queryParams: any, fields: FieldBase<any>[]) {
        let rules: Rule[] = []
        for (let p in queryParams) {
            fields.forEach((v) => {
                if (v.key == p && queryParams[p] && v.op) {
                    if (v.op.advanced) {
                        let filtersbefore = queryParams.filters
                        let rule = new Rule(v.key, v.op.name, queryParams[p])
                        rules.push(rule)
                        delete queryParams[p]
                    }
                    // queryParams.
                }

            })
        }
        if (rules.length > 0) {
            let con = new Conditions("AND", rules, [])
            queryParams.filters = con
        }
    }

    refreshData(url: string, pageSize: number, pageIndex: number, cond: any, sidx: string, sord: string) {
        return this.getPageService().getPage(url, pageSize, pageIndex, cond, sidx, sord).then(data => {
            this.length = data.total
            this.rowData = data.contents
            this.aggridOptions.api.setRowData(this.rowData);
            // this.rowData = data
        })
    }

    gridReady($event) {

        this.aggridOptions.api.sizeColumnsToFit()

        if (this.rowModelType == 'inMemory') {
            this.getPageService().getPage(this.url, this.pageSize, this.pageIndex, this.cond).then(data => {
                this.length = data.total
                this.rowData = data.contents
                this.aggridOptions.api.setRowData(this.rowData);
                // this.rowData = data
            })
        }
    }

    onSortChanged($event) {
        let sortModel = this.aggridOptions.api.getSortModel()
        let sortCol = sortModel[0]
        if (sortCol) {
            this.sidx = sortCol.colId
            this.sord = sortCol.sort
            setTimeout(() => {
                this.refresh()
            });
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
            this.attachComparatorToColDefs(this.agGridColDefs)

            return this.agGridColDefs
        }
    }

    attachComparatorToColDefs(defs: any[]) {
        defs.forEach((v) => {
            if (v.children) {
                this.attachComparatorToColDefs(v.children)
            } else {
                v.comparator = function (valueA, valueB, nodeA, nodeB, isInverted) {
                    return 0
                }
            }
        })
    }

    openDialog(modalConfig: ModalConfig, data: any): void {
        if (!modalConfig.data) {
            modalConfig.data = {}
        }
        Object.assign(modalConfig.data, data)
        this.euModalService.open(modalConfig, (result) => {
            this.refresh()
        }, (result) => {
            this.refresh()
        })
    }

    onAction(action: EuGridAction) {
        let ids = this.getSelectedRowIds()
        let datas = this.getSelectedDatas()
        let ege: EuGridEvent = new EuGridEvent(
            this.euGridOptions.gridId,
            action,
            ids.length > 0 ? ids[0] : undefined,
            ids,
            datas.length > 0 ? datas[0] : undefined,
            datas,
            this.getActionParams(action.key)
        )
        switch (action.curdType) {
            case EuGridAction.TYPE_CREATE:
                let modalConfig = action.modalConfig || this.euGridOptions.defaultActionModalConfig
                this.openDialog(modalConfig, {
                    euGridEvent: ege
                })
                break
            case EuGridAction.TYPE_UPDATE:
                if (ids.length == 1) {
                    let modalConfig1 = action.modalConfig || this.euGridOptions.defaultActionModalConfig
                    this.openDialog(modalConfig1, { euGridEvent: ege })
                } else {
                    this.snackBar.open('请选择一条记录！', '关闭', {
                        duration: 800
                    });
                }
                break
            case EuGridAction.TYPE_QUERY:
                this.queryExpanded = !this.queryExpanded
                break
            case EuGridAction.TYPE_READ:
                this.refresh()
                break
            case EuGridAction.TYPE_DELETE:
                break
            default:
                //有modal配置就是要打开modal咯
                if (action && action.modalConfig) {
                    this.openDialog(action.modalConfig, { euGridEvent: ege })
                }
        }
        this.euGridEvent.emit(ege)
    }

    refresh(params?: any) {
        this.refreshData(this.url, this.pageSize, this.pageIndex, params || this.cond, this.sidx, this.sord)
    }

    addParams: (params, fresh?: boolean) => void
    removeParam: (paramName, fresh?) => void

    setParams(params, fresh?) {
        this.originParams = params
        if (fresh) {
            this.refresh()
        }
    }

    private actionParams: any = {}
    /**
     * 设置action的外部参数（非rowId这些）
     * @param actionKey 
     * @param param 
     * @param all 是否所有action生效
     */
    setActionParams(actionKey: string, param: any, all?: boolean) {
        if (all) {
            this.actionParams.all = param
        } else {
            this.actionParams[actionKey] = param
        }
    }

    getActionParams(key: string): any {
        return Object.assign({}, this.actionParams[key], this.actionParams.all)
    }

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
        let ids: any[] = []
        let datas: any[] = this.aggridOptions.api.getSelectedRows()
        datas.forEach(v => {
            ids.push(v[this.euGridOptions.primaryKey])
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

    private getPageService(): EuPageService {
        return this.inputPageService || this.pageService
    }

}