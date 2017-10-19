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
            t: "menu1",
            l: "ddd",
            i: "",
            c: [
                {
                    id: "1",
                    t: "menu1",
                    l: "ddd",
                    i: ""
                },
                {
                    id: "1",
                    t: "menu1",
                    l: "ddd",
                    i: ""
                },
            ]
        },
        {
            id: "1",
            t: "menu1",
            l: "ddd",
            i: ""
        },
        {
            id: "1",
            t: "menu1",
            l: "ddd",
            i: ""
        },
    ]
    constructor() { }

    ngOnInit() {

    }

}