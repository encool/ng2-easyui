import { Component, OnInit } from '@angular/core';

import { OnModalAction } from 'ng2-easyui.core'

@Component({
    selector: 'modal-message-container',
    template: `
    <div [innerHTML]="message"></div>
    `
})
export class MessageComponent implements OnInit, OnModalAction {

    message: string = ""
    constructor() { }

    ngOnInit() {

    }

    onModalClose() {

    }

    onModalDismiss() {

    }
}