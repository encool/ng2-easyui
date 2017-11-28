
import { Type } from '@angular/core';
import { Route, Data, UrlMatcher, ResolveData } from "@angular/router";

type euRouteDef = {
    path?: string;
    pathMatch?: string;
    matcher?: UrlMatcher;
    component?: Type<any>;
    redirectTo?: string;
    outlet?: string;
    canActivate?: any[];
    canActivateChild?: any[];
    canDeactivate?: any[];
    canLoad?: any[];
    data?: Data;
    resolve?: ResolveData;
    // children?: Routes;
    // loadChildren?: LoadChildren;
    // runGuardsAndResolvers?: RunGuardsAndResolvers;

    moduleName: String
}

let routes = new Array<euRouteDef>()
let entryTypes = new Array<Type<any>>()
let moduleRoutes = new Map<String, Array<euRouteDef>>()

export function UIComponent(options: euRouteDef) {
    // 
    routes.push(options)
    return function ({ constructor: Function }) {

    }
}
export function getRoutes(moduleName: string): Route[] {
    let moduleRoutes = routes.filter(value => value.moduleName === moduleName)

    let result = new Array<Route>()
    moduleRoutes
    return moduleRoutes
}
export { }