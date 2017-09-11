import { BaseAction } from './action'
export abstract class CURDAction extends BaseAction {
    public static TYPE_CREATE: string = '1'
    public static TYPE_UPDATE: string = '2'
    public static TYPE_READ: string = '3'
    public static TYPE_DELETE: string = '4'
    public static TYPE_QUERY: string = '5'

    curdType: string
    constructor(options: BaseAction
        & {
            curdType: string
        }) {
        super(options)
        this.curdType = options.curdType
    }
}