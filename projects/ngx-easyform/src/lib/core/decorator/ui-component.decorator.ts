
import { Type } from '@angular/core';
import { FieldBase } from "../field/field-base"

let uilist = new Array<{
    selector: string,
    component: any,
    name?: string,
    field?: typeof FieldBase
}>()
let uimap = new Map<string, Type<any>>()
let uimap1 = new Map<string, any>()

export function UIComponent(options: {
    selector: string,
    component: any,
    name?: string,
    field?: typeof FieldBase
}) {
    // 
    if (!options["name"]) {
        let l = options.component.name.length
        // options["name"] = options.component.name.substr(0, l - 9)
        options.name = options.component.name
    }
    uilist.push(options)
    uimap.set(options.selector, options.component)
    uimap1.set(options.selector, options)
    // console.log("uicomponent: selector", options.selector);
    // console.log("uicomponent: component", options.component);
    return function ({ constructor: Function }) {

    }
}
export { uimap, uimap1, uilist }