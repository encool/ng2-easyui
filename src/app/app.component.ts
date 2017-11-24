import { Component, Inject, ViewContainerRef } from '@angular/core';

import {
  EasyUIMdModalModule, MdModalService, ModalConfig, EuModalService
  // } from 'ng2-easyui'
} from '../../widget'


import { MAT_DIALOG_DATA, MatDialog } from "@angular/material"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private mdModalService: EuModalService, private mdDialog: MatDialog, private viewContainerRef: ViewContainerRef) {

  }

  openDialog() {
    let mc: ModalConfig = {
      component: DialogDataExampleDialog,
      data: {
        data: 'test'
      },
      // viewContainerRef:this.viewContainerRef,
    }
    this.mdModalService.open(mc, (result) => {
      debugger
    })
    // this.mdDialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda'
    //   }
    // });    
  }
}

import {
  OnModalAction
} from '../../widget'

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    hello world!
  `,
})
export class DialogDataExampleDialog implements OnModalAction {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    // debugger
  }

  onModalClose() {
    return "close from container"
  }

  onModalDismiss() {

  }
}
