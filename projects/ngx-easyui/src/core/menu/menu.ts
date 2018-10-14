export class Menu {
    public id: string
    public i: string
    public t: string
    public l?: string
    public isSelected?: boolean
    public c?: Array<Menu>
    public active?: boolean
    public parent?: string
    public o?: string
    public e?: string
    constructor(options: {
        id: string, i: string, t: string, l?: string, isSelected?: boolean, c?: Array<Menu>,
        active?: boolean, parent?: string, o?: string, e?: string
    }) {
        this.id = options.id
        this.i = options.i
        this.t = options.t
        this.l = options.l
        this.isSelected = options.isSelected
        this.c = options.c
        this.active = options.active
        this.parent = options.parent
        this.o = options.o
        this.e = options.e
    }
}