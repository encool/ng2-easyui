export class EuColModel {
    headerName: string
    field: string
    checkboxSelection: boolean | Function
    headerCheckboxSelection: boolean | Function

    title: string//是否设置单元格的 title 属性。
    width: number | string//该列的宽度
    align: string //对齐方式："left" "center" "right"
    classes: string//给单元格添加类。

    fixed: boolean//设置为 true 时，该列的宽度固定，不会自动拉伸或者压缩。
    frozen: boolean//该列是否可以被冻结
    hidedlg: boolean
    hidden: boolean//设为 true 时，初始化的时候隐藏该列。
    index: string//点击表头排序时，会将这个值传到后台，从而标识是以该列排序。
    key: boolean//如果返回的数据中没有 id 值，那么可以设置这个做为每行的 id 。行 id 的生成当然会计数从而不重复。 只能有一列可设置该值
    resizable: boolean//该类是否可以拖动边界改变宽度。
    sortable: boolean//该列是否可以排序。   
    dragable: boolean//拖动 

    formatter: (value, option, rowObject) => {} | string
    constructor(options: {
        align?: string
        headerName?: string,
        field?: string,
        width?: number | string,
        formatter?: (value, option, rowObject) => {} | string,
        hidden?: boolean,
        key?: boolean
        classes?: string
        sortable?: boolean
        resizable?: boolean
        frozen?: boolean
        index?: string
        dragable?: boolean
    } = {}
    ) {
        this.headerName = options.headerName
        this.field = options.field
        this.width = options.width
        this.formatter = options.formatter
        this.hidden = options.hidden
        this.key = options.key
        this.align = options.align
        this.classes = options.classes
        this.sortable = options.sortable
        this.resizable = options.resizable
        this.fixed = options.frozen
        this.index = options.index
        this.dragable = options.dragable
    }
}