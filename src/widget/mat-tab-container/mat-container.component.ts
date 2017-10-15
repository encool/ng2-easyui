import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { EuTabService } from "./eu-tab.service";

@Component({
    selector: 'eu-mat-container',
    templateUrl: 'mat-container.component.html',
    styleUrls: ["mat-container.component.css"]
})
export class MatContainerComponent implements OnInit {


    @Input() indexTab: EuMatTab = {
        path: ["/"],
        label: "首页"
    }

    constructor(private router: Router, private euTabService: EuTabService) {

    }

    ngOnInit() {
        // debugger
        this.euTabService.init(this.indexTab)
    }

    tabClose(tab: EuMatTab) {
        this.euTabService.removeTab(tab)
    }

}

export interface EuMatTab {
    isIndex?: boolean
    hash?: string
    path: any[]
    label: string
}