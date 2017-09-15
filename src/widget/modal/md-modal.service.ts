import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type, ComponentFactoryResolver } from '@angular/core';
// import { Injectable } from '@angular/platform-browser-dynamic'
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material'

import 'rxjs/add/operator/toPromise';

import { ModalContainerComponent } from './modal.container.component'
import { ModalAction } from '../../core/modal/modal.action'
import { ModalConfig } from '../../core/modal/modal-config'
import { EuModalService } from '../../core/modal/eu-modal.service'

@Injectable()
export class MdModalService extends EuModalService {

    _modal_context: {
        vcRef: ViewContainerRef
        componentFactoryResolver: ComponentFactoryResolver
    }

    _default_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, isCancel: true, style: "default" }),
        new ModalAction({ key: "close", name: "保存", order: 2, isClose: true, style: "primary" })
    ]

    _confirm_actions: Array<ModalAction> = [
        new ModalAction({ key: "cancel", name: "取消", order: 1, isCancel: true, style: "default" }),
        new ModalAction({ key: "close", name: "确定", order: 2, isClose: true, style: "primary" })
    ]
    _smodalstack = []
    // _ref:ComponentRef<SimpleModalComponent>
    constructor(public dialog: MdDialog) {
        super()
    }

    openMdDialog<T extends Type<any>>(component: T, mdDialogConfig: MdDialogConfig, success?: Function, dismiss?: Function): void {
        let dialogRef: MdDialogRef<T> = this.dialog.open<T>(component, mdDialogConfig);

        // dialogRef.afterClosed().subscribe(result => {
        //     if (success) {
        //         success(result)
        //     }
        // });
    }

    openConfirm<T>(
        modalOptions: ModalConfig,
        success?: Function, dismiss?: Function) {
        // let myComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
        // let _ref: ComponentRef<ModalContainerComponent<T>> = modalContext.vcRef.createComponent(myComponentFactory);

        // let successwrapper = (data) => {
        //     if (success) {
        //         success(data)
        //     }
        //     this.destroy();
        // }


        // let dismisswrapper = (data) => {
        //     if (dismiss) {
        //         dismiss(data)
        //     }
        //     this.destroy();
        // }

        // this._smodalstack.push(_ref)

        // _ref.instance.openConfirm(modalOptions.message, successwrapper, dismisswrapper)
        // _ref.instance._width = modalOptions.width
        // _ref.instance._height = modalOptions.height
        // _ref.instance._title = modalOptions.title
        // _ref.instance._actions = modalOptions.actions == undefined ? this._confirm_actions : modalOptions.actions
    }

    open(
        modalOptions: ModalConfig,
        success?: Function, dismiss?: Function) {
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
        let mdDialogConfig: MdDialogConfig = {
            data: data,
            height: modalOptions.height,
            position: {
                top: "120px"
            },
            width: modalOptions.width,
            viewContainerRef: modalOptions.viewContainerRef
        }
        this.openMdDialog(ModalContainerComponent, mdDialogConfig, success, dismiss)
        // let myComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(SimpleModalComponent);
        // let _ref: ComponentRef<SimpleModalComponent> = modalContext.vcRef.createComponent(myComponentFactory);
        // // let _ref: ComponentRef<SimpleModalComponent> = this._modal_context.vcRef.createComponent(myComponentFactory);
        // let myContentComponentFactory = modalContext.componentFactoryResolver.resolveComponentFactory(modalOptions.comp);

        // let successwrapper = (data) => {
        //     if (success) {
        //         success(data)
        //     }
        //     this.destroy();
        // }


        // let dismisswrapper = (data) => {
        //     if (dismiss) {
        //         dismiss(data)
        //     }
        //     this.destroy();
        // }

        // this._smodalstack.push(_ref)

        // _ref.instance.open(myContentComponentFactory, params, successwrapper, dismisswrapper)
        // _ref.instance._width = modalOptions.width
        // _ref.instance._height = modalOptions.height
        // _ref.instance._title = modalOptions.title
        // _ref.instance._actions = modalOptions.actions == undefined ? this._default_actions : modalOptions.actions
    }

    open2(
        modalOptions: {
            comp: Type<any>
            actions?: ModalAction[]
            width?: string
            title?: string
            height?: string | number
        },
        params: any,
        success?: Function, dismiss?: Function) {
        // debugger
        // let myComponentFactory = this._modal_context.componentFactoryResolver.resolveComponentFactory(SimpleModalComponent);
        // let _ref: ComponentRef<SimpleModalComponent> = this._modal_context.vcRef.createComponent(myComponentFactory);
        // let myContentComponentFactory = this._modal_context.componentFactoryResolver.resolveComponentFactory(modalOptions.comp);

        // let successwrapper = (data) => {
        //     if (success) {
        //         success(data)
        //     }
        //     this.destroy();
        // }


        // let dismisswrapper = (data) => {
        //     if (dismiss) {
        //         dismiss(data)
        //     }
        //     this.destroy();
        // }

        // this._smodalstack.push(_ref)

        // _ref.instance.open(myContentComponentFactory, params, successwrapper, dismisswrapper)
        // _ref.instance._width = modalOptions.width
        // _ref.instance._height = modalOptions.height
        // _ref.instance._title = modalOptions.title
        // _ref.instance._actions = modalOptions.actions == undefined ? this._default_actions : modalOptions.actions
    }

    destroy() {
        let cmpRef: ComponentRef<any> = this._smodalstack.pop();
        cmpRef.destroy()
    }
}