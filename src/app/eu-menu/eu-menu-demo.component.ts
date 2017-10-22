import { Component, OnInit } from '@angular/core';

import { Menu } from '../../../'

@Component({
    selector: 'eu-menu-demo',
    template: `
        <eu-menu-list [menus]="menus"></eu-menu-list>
    `
})
export class EuMenuDemoComponent implements OnInit {

    menus: Menu[] = [
        {
            id: "1",
            title: "系统设置",
            link: "ddd",
            icon: "",
            children: [
                {
                    id: "1",
                    title: "系统设置",
                    link: "ddd",
                    icon: "",
                    children: [
                        {
                            id: "1",
                            title: "系统设置",
                            link: "ddd",
                            icon: "",
                        },
                        {
                            id: "1",
                            title: "系统设置",
                            link: "ddd",
                            icon: "",
                        },
                    ]
                },
                {
                    id: "1",
                    title: "系统设置",
                    link: "ddd",
                    icon: "",
                },
            ]
        },
        {
            id: "1",
            title: "系统设置",
            link: "ddd",
            icon: "",
        },
        {
            id: "1",
            title: "系统设置",
            link: "ddd",
            icon: "",
        },
    ]
    constructor() { }

    ngOnInit() {

    }

}