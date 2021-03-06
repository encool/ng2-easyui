import { Component, Inject, ViewContainerRef } from '@angular/core';

import {
  EasyUIMdModalModule, MdModalService
} from 'ng2-easyui'
// } from '../../widget'
import { ModalConfig } from "ng2-easyui.core";
import { EuModalService } from "ng2-easyui.core";

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
// } from '../../widget'
} from 'ng2-easyui.core'

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
