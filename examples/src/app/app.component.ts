import { Component, Inject, ViewContainerRef } from '@angular/core';

import { EasyUIMdModalModule, MdModalService, ModalConfig } from '../../../'

import { MD_DIALOG_DATA, MdDialog } from "@angular/material"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private mdModalService: MdModalService, private mdDialog: MdDialog, private viewContainerRef: ViewContainerRef) {

  }

  openDialog() {
    let mc: ModalConfig = {
      component: DialogDataExampleDialog,
      data: {
        data: 'test'
      },
      // viewContainerRef:this.viewContainerRef,
    }
    this.mdModalService.open(mc,(result)=>{
      debugger
    })
    // this.mdDialog.open(DialogDataExampleDialog, {
    //   data: {
    //     animal: 'panda'
    //   }
    // });    
  }
}

import { OnModalAction } from '../../../'

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    hello world!
  `,
})
export class DialogDataExampleDialog implements OnModalAction {

  constructor( @Inject(MD_DIALOG_DATA) public data: any) {
    // debugger
  }

  onModalClose() {
    return "close from container"
  }

  onModalDismiss() {

  }
}
