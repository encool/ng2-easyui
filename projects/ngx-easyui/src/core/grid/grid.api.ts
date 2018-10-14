import { EuGridAction } from './grid.action'
export interface GridApi {

    onAction: (action: EuGridAction) => void

    /**
     * 刷新列表
     * param:表格查询传递的参数对象{xx:xx,xxx:xxx}
     */
    refresh: (param?) => void

    addParams: (params, fresh?: boolean) => void
    removeParam: (paramName, fresh?) => void

    setParams: (params, fresh?) => void

    // getDataIDs = function () {
    //     return this.jqgridObject.jqGrid("getDataIDs");
    // }
    //获取指定列的数据 rowId:主列的值;如果rowId为空，则返回表格全部数据。
    getRowData: (rowId) => {}
    //获取表格信息。param:"rowNum"-每页记录条数 "page"-当前第几页 “records”-总共有多少条
    // getGridParam = function (param) {
    //     return this.jqgridObject.jqGrid("getGridParam", param);
    // }
    //获取单个选中的行的主列值，如果选中多个这返回最后选中的值
    getSingleSelectedRowId: () => string
    //获取所有选中的行的主列值，返回数组
    getSelectedRowIds: () => string[]
    //返回单个选中的行数据
    getSingleSelectedData: () => any
    //返回所有选中行数据的数组
    getSelectedDatas: () => Array<any>

}