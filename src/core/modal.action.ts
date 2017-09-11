import { BaseAction } from './action'
export abstract class ModalAction extends BaseAction {
    isCancel: boolean
    isClose: boolean
    isReset: boolean
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