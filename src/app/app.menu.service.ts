import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {
    EuMenuService, Menu
} from 'ngx-easyui-core'
// } from 'ng2-easyui'

@Injectable()
export class AppMenuService extends EuMenuService {

    getApplicationMenus(fetch: boolean): Promise<Menu[]> {
        return new Promise((resolve) => {
            this.appMenus = this.menus
            resolve(this.menus)
        });
    }

    menus: Menu[] = [
        {
            id: "1",
            t: "feature",
            i: "",
            c: [
                {
                    id: "1",
                    t: "demo",
                    i: "",
                    c: [
                        {
                            id: "1",
                            t: "aggrid",
                            l: "/demo/EuAggridDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "Bpmn2Demo",
                            l: "Bpmn2Demo/Bpmn2DemoComponent",
                            i: "",
                        },
                    ]
                },
                {
                    id: "1",
                    t: "demo",
                    i: "",
                    c: [
                        {
                            id: "1",
                            t: "matpanel",
                            l: "/MatPanelDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "ng2Tree",
                            l: "/Ng2TreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "antdTree",
                            l: "/AntdTreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "SelectTree",
                            l: "/SelectTreeDemoComponent",
                            i: "",
                        },
                        {
                            id: "1",
                            t: "SelectTreeForm",
                            l: "/SelectTreeFormComponent",
                            i: "",
                        },
                        {
                            id: "1222",
                            t: "AntSelectTreeDemo",
                            l: "/AntSelectTreeDemoComponent",
                            i: "",
                        },
                    ]
                },
            ]
        },
        {
            id: "1",
            t: "level1",
            i: "",
            c: [
                {
                    id: "1",
                    t: "level2",
                    l: "ddd1",
                    i: "",
                },
                {
                    id: "1",
                    t: "demo",
                    l: "ddd2",
                    i: "",
                },
            ]
        },
        {
            id: "1",
            t: "系统设置",
            l: "ddd3",
            i: "",
        },
    ]
}