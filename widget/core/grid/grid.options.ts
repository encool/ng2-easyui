import { Type } from "@angular/core"
import { BaseAction } from '../action'
import { CURDAction } from "../curd.action";
import { FieldBase } from 'ng2-easyform';
import { ModalConfig } from '../modal/modal-config'

export class EuGridOptions {
    primaryKey: string
    actions: BaseAction[]
    defaultActionModalConfig: ModalConfig
    queryfields: FieldBase<any>[]
    title: string
    gridId: string

    url: string
    postData: any
    editurl: string
    mtype: string
    //				colNames:colNames,//定义列头名称，已在colModel里面设置
    // colModel:scope.colModel,
    //				caption: attrs.caption,//标题，不使用jqGrid的标题显示，显示到表头工具栏左边
    multiselect: boolean//是否能够多选
    multiboxonly: boolean = true//需要点击checkbox才能多选
    datatype: "json"
    sortable: boolean = false//When set to true, this option allows reordering columns by dragging and dropping them with the mouse. Since this option uses the jQuery UI sortable widget, be sure to load this widget and its related files in the HTML head tag of the page. Also, be sure to select the jQuery UI Addons option under the jQuery UI Addon Methods section while downloading jqGrid if you want to use this facility.???没效果
    suppressRowDrag: boolean
    sortname: string
    sortorder: string
    multiSort: boolean//多列排序
    autowidth: boolean
    height: number | string
    width: number
    rownumbers: boolean//显示序号
    scroll: boolean | number//滚动条代替翻页
    scrollrows: boolean = true//当为true时让所选择的行可见？？
    scrollOffset: number//滚动条宽度
    rowNum: number
    rowList: Array<any>
    //				pager : "#grid-pager-"+scope.id, //分页栏
    pagerpos: string//指定分页栏的位置
    pgbuttons: boolean = true//是否显示翻页按钮
    pginput: boolean = true//是否显示跳转页面的输入框
    viewrecords: boolean = true//是否显示总记录数
    //				pgtext:"",//在表格底部显示当前页信息
    toolbar: Array<any>//表格的工具栏。数组中有两个值，第一个为是否启用，第二个指定工具栏位置（相对于body layer），如：[true,”both”] 。工具栏位置可选值：“top”,”bottom”, “both”. 如果工具栏在上面，则工具栏id为“t_”+表格id；如果在下面则为 “tb_”+表格id；如果只有一个工具栏则为 “t_”+表格id
    toppager: boolean = false//分页栏是否放在顶部
    altRows: boolean = true //条纹
    altclass: "ui-priority-secondary"
    shrinkToFit: boolean = true//此属性用来说明当初始化列宽度时候的计算类型，如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用colModel指定的宽度
    forceFit: boolean = false//调整列宽度不会改变表格的宽度,设为true时，分组调整列宽有问题
    hiddengrid: boolean = false//当为ture时，表格不会被显示，只显示表格的标题。只有当点击显示表格的那个按钮时才会去初始化表格数据。
    hidegrid: boolean = true//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效
    //				gridstate:"visible",//定义当前表格的状态：'visible' or 'hidden'
    //				multikey: "ctrlKey",
    //		        prmNames:{page:"page",rows:"rows", sort:"sidx", order:"sord", search:"_search", nd:"nd", id:"id", oper:"oper", editoper:"edit", addoper:"add", deloper:"del", subgridid:"id", npage:null, totalrows:"totalrows"},
    cellEdit: boolean = false
    cellsubmit: 'remote'
    cellurl: ""
    //				ajaxGridOptions:
    //				ajaxSelectOptions:
    autoencode: boolean = true//防止代码注入
    gridview: boolean = false//设为true后可以获得更快的表格加载速度，但是不能使用treeGrid, subGrid, or the afterInsertRow event.
    //				data:[],
    //				datastr
    //				subGrid:,
    //				subGridModel:,
    //				subGridType:,
    //				subGridUrl:,
    //				subGridWidth:20
    // //树表配置
    // treeGrid: scope.treeGrid,
    // treeGridModel:"adjacency",
    // ExpandColClick:scope.expandColClick,
    // ExpandColumn:attrs.expandColumn,
    // treeIcons:{ 
    //     plus: attrs.treeIconPlus, // 折合状体 
    //     minus: attrs.treeIconMinus, // 展开状态 
    //     leaf: attrs.treeIconLeaf // 叶子 
    //     },
    // treeReader:{
    //         level_field: "level",
    //         parent_id_field: "pid",
    //         leaf_field: "isLeaf",
    //         expanded_field: "open"
    //     },
    //				tree_root_level:,
    //				userData:,//从request中取得的一些用户信息
    //				userDataOnFooter:false,//当为true时把userData放到底部，用法：如果userData的值与colModel的值相同，那么此列就显示正确的值，如果不等那么此列就为空
    //				deepempty:false,//This option should be set to true if an event or a plugin is attached to the table cell. The option uses jQuery empty for the the row and all its children elements. This of course has speed overhead, but prevents memory leaks. This option should be set to true if a sortable rows and/or columns are activated.
    //				deselectAfterSort:true,//只有当datatype为local时起作用。当排序时不选择当前行
    //				direction:"ltr",//表格中文字的显示方向，从左向右（ltr）或者从右向左（rtr）
    //		        cmTemplate:
    //				emptyrecords://当返回的数据行数为0时显示的信息。只有当属性 viewrecords 设置为ture时起作用
    //				selarrrow:[],//只读属性，用来存放当前选择的行
    //				selrow://只读属性，最后选择行的id
    //				xmlReader:
    //改传入数据格式
    // jsonReader: {
    //     root:"contents",
    //     id:jsonReaderId,
    //     page:"pageIndex",
    //     records:"total",
    //     total:"totalPage"
    // },    

    ajaxGridOptions: any	//This option allows to set global ajax settings for the grid when requesting data. Note that with this option it is possible to overwrite all current ajax settings in the grid including the error, complete and beforeSend events.	empty object	Yes
    ajaxSelectOptions: any	//This option allows to set global ajax settings for the select element when the select is obtained via dataUrl option in editoptions or searchoptions objects	empty object	Yes

    rowDragManaged: boolean = true
    constructor(options: {
        gridId: string
        url: string
        primaryKey: string
        title: string
        queryfields?: FieldBase<any>[]
        defaultActionModalConfig?: ModalConfig,
        actions?: Array<BaseAction>
        defaultaction?: boolean
        multiselect?: boolean
        mtype?: string
        rowNum?: number
        postData?: any
        rowDragManaged?: boolean
        sortable?: boolean
        suppressRowDrag?: boolean
    }) {
        this.gridId = options.gridId
        this.url = options.url
        this.primaryKey = options.primaryKey
        this.multiselect = options.multiselect == undefined ? true : options.multiselect
        this.title = options.title
        this.queryfields = options.queryfields || []
        this.mtype = options.mtype == undefined ? "get" : options.mtype
        this.defaultActionModalConfig = options.defaultActionModalConfig
        this.actions = options.defaultaction == true ? [
            CURDAction.CREATE,
            CURDAction.UPDATE,
            CURDAction.QUERY,
            CURDAction.READ,
            CURDAction.DELETE,
        ] : options.actions
        this.rowNum = options.rowNum == undefined ? 10 : options.rowNum
        this.postData = options.postData == undefined ? {} : options.postData
        this.rowDragManaged = options.rowDragManaged == undefined ? false : options.rowDragManaged
        this.sortable = options.sortable || false
        this.suppressRowDrag = options.suppressRowDrag == undefined ? false : options.suppressRowDrag
    }
}