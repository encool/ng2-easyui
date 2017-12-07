import { BaseAction } from './action'
export class CURDAction extends BaseAction {
    public static TYPE_CREATE: string = '1'
    public static TYPE_UPDATE: string = '2'
    public static TYPE_READ: string = '3'
    public static TYPE_DELETE: string = '4'
    public static TYPE_QUERY: string = '5'

    public static defaultAtcions = {
        TYPE_CREATE: {
            icon: 'add',
            style: "basic"
        },
        TYPE_UPDATE: {
            icon: 'mode_edit',
            style: "primary"
        },
        TYPE_QUERY: {
            icon: 'search',
            style: "accent"
        },
        TYPE_READ: {
            icon: 'sync',
            style: "accent"
        },
        TYPE_DELETE: {
            icon: 'delete_forever',
            style: "warn"
        },
    }

    public static CREATE: CURDAction = new CURDAction({
        key: "add", name: "新增", order: 1,
        curdType: CURDAction.TYPE_CREATE,
        icon: "add",
        // icon: CURDAction.defaultAtcions[CURDAction.TYPE_CREATE].icon
        style: "basic"
    })
    public static UPDATE: CURDAction = new CURDAction({
        key: "edit", name: "编辑", order: 2,
        curdType: CURDAction.TYPE_UPDATE,
        icon: "mode_edit",
        // icon: CURDAction.defaultAtcions[CURDAction.TYPE_UPDATE].icon
        style: "primary"
    })
    public static QUERY: CURDAction = new CURDAction({
        key: "refresh", name: "查询", order: 3,
        curdType: CURDAction.TYPE_QUERY,
        icon: "search",
        // icon: CURDAction.defaultAtcions[CURDAction.TYPE_QUERY].icon
        style: "accent"
    })
    public static READ: CURDAction = new CURDAction({
        key: "query", name: "刷新", order: 4,
        curdType: CURDAction.TYPE_READ,
        icon: "sync",
        // icon: CURDAction.defaultAtcions[CURDAction.TYPE_READ].icon
        style: "accent"
    })
    public static DELETE: CURDAction = new CURDAction({
        key: "delete", name: "删除", order: 5,
        curdType: CURDAction.TYPE_DELETE,
        icon: "delete_forever",
        // icon: CURDAction.defaultAtcions[CURDAction.TYPE_DELETE].icon
        style: "warn"
    })

    curdType: string
    constructor(options: BaseAction
        & {
            curdType: string
        }) {
        super(options)
        this.curdType = options.curdType
    }
}