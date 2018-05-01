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
    constructor(id: string, i: string, t: string, l?: string, isSelected?: boolean, c?: Array<Menu>,
        active?: boolean, parent?: string, o?: string, e?: string) {

    }
}