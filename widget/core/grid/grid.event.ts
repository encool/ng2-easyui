import { EuGridAction } from './grid.action'

export class EuGridEvent {
    gridId: string
    action: EuGridAction
    rowId: string
    rowIds: string[]
    rowData: any
    rowDatas: Array<any>
    constructor(gridId: string, action: EuGridAction, rowId?: string, rowIds?: string[], rowData?: any, rowDatas?: Array<any>) {
        this.gridId = gridId;
        this.action = action
        this.rowId = rowId
        this.rowIds = rowIds
        this.rowData = rowData
        this.rowDatas = rowDatas
    }
}