import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatAccordionDisplayMode } from "@angular/material";

import { Menu } from "./menu";

@Component({
    selector: 'eu-mat-menu-list',
    templateUrl: 'menu-list.component.html',
    styles: [".easyui-mat-menu .mat-expansion-panel-body{margin-bottom:0px}"],
    encapsulation: ViewEncapsulation.None

})
export class MenuListComponent implements OnInit {

    menus: Menu[] = [
        {
            id: "1",
            t: "系统设置",
            l: "",
            i: "",
            c: [
                {
                    id: "2",
                    t: "系统设置1",
                    l: "",
                    i: ""
                },
                {
                    id: "3",
                    t: "系统设置2",
                    l: "",
                    i: ""
                }
            ]
        },
        {
            id: "2",
            t: "系统设置1",
            l: "",
            i: ""
        },
        {
            id: "3",
            t: "系统设置2",
            l: "",
            i: ""
        }
    ]

    displayMode: MatAccordionDisplayMode = "flat"

    constructor() { }

    ngOnInit() {

    }

}