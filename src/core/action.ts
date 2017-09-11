import { Type } from "@angular/core"
export abstract class BaseAction {
    key: string
    name: string
    order?: number
    icon?: string
    iconType?: string
    style?: string
    component?: Type<any>
    constructor(options:
        {
            key: string,
            name: string,
            icon?: string
            order?: number
            style?: string
            component?: Type<any>
        }) {
        this.key = options.key;
        this.name = options.name;
        this.icon = options.icon
        this.order = options.order === undefined ? 999 : options.order
        this.style = options.style
        this.component = options.component
    }
}