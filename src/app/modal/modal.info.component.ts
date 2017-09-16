import { Component, Inject, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { OnModalAction, EuGridEvent } from '../../../'
// import { EasyUIMdModalModule, MdModalService, ModalConfig } from '../../../'

import { MD_DIALOG_DATA, MdDialog } from "@angular/material"

@Component({
    selector: 'dialog-data-example-dialog',
    template: `
    {{ege.rowId}}
  `,
})
export class ModalInfoComponent implements OnModalAction {

    ege: EuGridEvent
    constructor( @Inject(MD_DIALOG_DATA) public data: any) {
        // debugger
        this.ege = data.euGridEvent
    }

    onModalClose() {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(42);
            }, 100);
        });
    }

    onModalDismiss() {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(43);
            }, 100);
        });
    }
}
