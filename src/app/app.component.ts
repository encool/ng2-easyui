import { Component, Inject, ViewContainerRef, OnInit } from '@angular/core';

import {
  ModalConfig,
  EuModalService,
  EuMenuService
} from "ngx-easyui-core";
import { } from "ngx-easyui-core";

import { MAT_DIALOG_DATA, MatDialog } from "@angular/material"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private mdModalService: EuModalService,
    private mdDialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private menuService: EuMenuService) {

  }

  ngOnInit() {
    this.menuService.getApplicationMenus().then((data) => {

    })
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
} from 'ngx-easyui-core'

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    hello world!
  `,
})
export class DialogDataExampleDialog implements OnModalAction {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // debugger
  }

  onModalClose() {
    return "close from container"
  }

  onModalDismiss() {

  }
}
