import { BaseAction } from '../action'
export class ModalAction extends BaseAction {
    isCancel: boolean
    isClose: boolean
    isReset: boolean
    public static CANCEL: ModalAction = new ModalAction({ key: "cancel", name: "取消", order: 1, isCancel: true, style: "default" })
    public static SAVE: ModalAction = new ModalAction({ key: "save", name: "保存", order: 2, isClose: true, style: "primary" })
    public static CONFIRM: ModalAction = new ModalAction({ key: "confirm", name: "确定", order: 3, isClose: true, style: "primary" })
    
    constructor(options:
        BaseAction &
        {
            isCancel?: boolean
            isClose?: boolean
            isReset?: boolean
        }) {
        super(options)
        this.isCancel = options.isCancel
        this.isClose = options.isClose
        this.isReset = options.isReset
    }
}