import { Injectable, ViewContainerRef, Compiler, ComponentRef, Type, ComponentFactoryResolver } from '@angular/core';
// import { Injectable } from '@angular/platform-browser-dynamic'

import { ModalAction } from './modal.action'
import { ModalConfig } from './modal-config'
@Injectable()
export abstract class EuModalService {

    _modal_context: {
        vcRef: ViewContainerRef
        componentFactoryResolver: ComponentFactoryResolver
    }

    _default_actions: Array<ModalAction>

    _confirm_actions: Array<ModalAction>

    _smodalstack = []
    // _ref:ComponentRef<SimpleModalComponent>
    constructor() {

    }

    abstract openConfirm(
        modalOptions: ModalConfig,
        success?: Function, dismiss?: Function,
        modalContext?: {
            vcRef: ViewContainerRef
            componentFactoryResolver: ComponentFactoryResolver
        })

    abstract open(
        modalOptions: ModalConfig,
        success?: Function, dismiss?: Function,
        modalContext?: {
            vcRef: ViewContainerRef
            componentFactoryResolver: ComponentFactoryResolver
        },
    )

    abstract destroy()
}