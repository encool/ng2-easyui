import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type, ComponentFactoryResolver } from '@angular/core';
// import { Injectable } from '@angular/platform-browser-dynamic'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'

import 'rxjs/add/operator/toPromise';

import { ModalContainerComponent } from './modal.container.component'
import { ModalAction } from 'ng2-easyui.core'
import { ModalConfig } from 'ng2-easyui.core'
import { EuModalService } from 'ng2-easyui.core'

@Injectable()
export class MdModalService extends EuModalService {

    _modal_context: {
        vcRef: ViewContainerRef
        componentFactoryResolver: ComponentFactoryResolver
    }

    _default_actions: Array<ModalAction> = [
        ModalAction.CANCEL,
        ModalAction.SAVE
        // new ModalAction({ key: "cancel", name: "取消", order: 1, isCancel: true, style: "default" }),
        // new ModalAction({ key: "close", name: "保存", order: 2, isClose: true, style: "primary" })
    ]

    _confirm_actions: Array<ModalAction> = [
        ModalAction.CANCEL,
        ModalAction.CONFIRM
        // new ModalAction({ key: "cancel", name: "取消", order: 1, isCancel: true, style: "default" }),
        // new ModalAction({ key: "close", name: "确定", order: 2, isClose: true, style: "primary" })
    ]
    _smodalstack = []
    // _ref:ComponentRef<SimpleModalComponent>
    constructor(public dialog: MatDialog) {
        super()
    }

    openMdDialog<T extends Type<any>>(component: T, mdDialogConfig: MatDialogConfig, success?: Function, dismiss?: Function): void {
        let dialogRef: MatDialogRef<T> = this.dialog.open<T>(component, mdDialogConfig);

    }

    openConfirm<T>(
        modalOptions: ModalConfig,
        success?: Function, dismiss?: Function) {
        let data: any = modalOptions.data || {}
        let euMdParams: any = {}
        euMdParams.component = modalOptions.component
        euMdParams.modalActions = modalOptions.modalActions == undefined ? this._confirm_actions : modalOptions.modalActions
        euMdParams.title = modalOptions.title || '确认'
        euMdParams.message = modalOptions.message
        euMdParams.success = success
        euMdParams.dismiss = dismiss
        data.euMdParams = euMdParams
        // debugger
        let mdDialogConfig: MatDialogConfig = {
            data: data,
            height: modalOptions.height,
            // position: {
            //     top: "120px"
            // },
            position: modalOptions.position,
            width: modalOptions.width,
            viewContainerRef: modalOptions.viewContainerRef
        }
        this.openMdDialog(ModalContainerComponent, mdDialogConfig, success, dismiss)
    }

    open(modalOptions: ModalConfig, success?: Function, dismiss?: Function) {
        let data: any = modalOptions.data || {}
        let euMdParams: any = {}
        euMdParams.component = modalOptions.component
        euMdParams.modalActions = modalOptions.modalActions == undefined ? this._default_actions : modalOptions.modalActions
        euMdParams.title = modalOptions.title
        euMdParams.message = modalOptions.message
        euMdParams.success = success
        euMdParams.dismiss = dismiss
        data.euMdParams = euMdParams
        // debugger
        let mdDialogConfig: MatDialogConfig = {
            data: data,
            height: modalOptions.height,
            // position: {
            //     top: "120px"
            // },
            position: modalOptions.position,
            width: modalOptions.width,
            viewContainerRef: modalOptions.viewContainerRef
        }
        this.openMdDialog(ModalContainerComponent, mdDialogConfig, success, dismiss)
    }

    destroy() {
        let cmpRef: ComponentRef<any> = this._smodalstack.pop();
        cmpRef.destroy()
    }
}