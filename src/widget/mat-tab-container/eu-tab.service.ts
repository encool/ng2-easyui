import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

// var hash = require('object-hash');

import { EuMatTab } from "./mat-container.component";

@Injectable()
export class EuTabService {

    navLinks: EuMatTab[] = []

    constructor(private router: Router, private location: Location) {

    }

    init(indexTab: EuMatTab) {
        this.navLinks = []
        indexTab.isIndex = true
        this.addEuMatTab(indexTab)
    }

    addEuMatTab(EuMatTab: EuMatTab) {
        // EuMatTab.hash = this._calculateHash(EuMatTab)
        if (this.existTab(EuMatTab) == -1) {
            this.navLinks.push(EuMatTab)
        }
    }

    existTab(EuMatTab: EuMatTab): number {
        let result = -1
        this.navLinks.forEach((value, index) => {
            if (value.fullPath == EuMatTab.fullPath) {
                result = index
            }
        })
        return result
    }

    removeTab(euMatTab: EuMatTab) {
        let index = this.existTab(euMatTab)
        if (index > 0) { //首页也不能移除
            this.navLinks.splice(index, 1)
        }
        // this.location.back()
        let tab: EuMatTab = this._findNextTab()
        this.router.navigateByUrl(tab.fullPath)
    }

    _findNextTab() {
        let length = this.navLinks.length
        return this.navLinks[length - 1]
    }

    // _calculateHash(tab: EuMatTab) {
    //     return hash(tab)
    // }

    // addEuMatTabAndNavigate(EuMatTab: EuMatTab) {
    //     // debugger
    //     this.addEuMatTab(EuMatTab)
    //     this.router.navigate([EuMatTab.path, EuMatTab])
    // }
}