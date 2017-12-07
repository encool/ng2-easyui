import { Type } from "@angular/core"
import { ModalConfig } from './modal/modal-config'

export abstract class BaseAction {
    key: string
    name: string
    order?: number
    icon?: string
    iconType?: string
    style?: string
    // if the action is pop a modal
    modalConfig?: ModalConfig
    constructor(options:
        {
            key: string,
            name: string,
            icon?: string
            order?: number
            style?: string
            modalConfig?: ModalConfig
        }) {
        this.key = options.key;
        this.name = options.name;
        this.icon = options.icon
        this.order = options.order === undefined ? 999 : options.order
        this.style = options.style
        this.modalConfig = options.modalConfig
    }
}

export interface euOnAction {
    onAction(action: BaseAction)
}