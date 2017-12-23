import { CURDAction } from '../curd.action'
export class EuGridAction extends CURDAction {
    public static CREATE: EuGridAction = new EuGridAction({ key: "add", name: "新增", order: 1, curdType: EuGridAction.TYPE_CREATE })
    public static UPDATE: EuGridAction = new EuGridAction({ key: "edit", name: "编辑", order: 2, curdType: EuGridAction.TYPE_UPDATE })
    public static QUERY: EuGridAction = new EuGridAction({ key: "refresh", name: "查询", order: 3, curdType: EuGridAction.TYPE_QUERY })
    public static READ: EuGridAction = new EuGridAction({ key: "query", name: "刷新", order: 4, curdType: EuGridAction.TYPE_READ })
    public static DELETE: EuGridAction = new EuGridAction({ key: "delete", name: "删除", order: 5, curdType: EuGridAction.TYPE_DELETE })

    constructor(options: CURDAction) {
        super(options)
        this.curdType = options.curdType
    }
}