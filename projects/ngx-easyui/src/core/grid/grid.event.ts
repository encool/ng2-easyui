import { BaseAction } from '../action'

export class EuGridEvent {
    gridId: string
    action: BaseAction
    rowId: string
    rowIds: string[]
    rowData: any
    rowDatas: Array<any>
    data?: any
    constructor(gridId: string, action: BaseAction, rowId?: string, rowIds?: string[], rowData?: any, rowDatas?: Array<any>, data?: any) {
        this.gridId = gridId;
        this.action = action
        this.rowId = rowId
        this.rowIds = rowIds
        this.rowData = rowData
        this.rowDatas = rowDatas
        this.data = data
    }
}