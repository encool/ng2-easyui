import { Component, ComponentFactory, ViewEncapsulation, OnInit, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { Observable } from 'rxjs/Observable'

import { OnModalAction, ModalAction } from 'ng2-easyui.core'

@Component({
    selector: 'modal-container',
    templateUrl: 'modal.container.component.html',
    styleUrls: ["modal.css"],
    encapsulation: ViewEncapsulation.None

})

export class ModalContainerComponent implements OnInit {

    euMdParams: {
        component,
        modalActions,
        title,
        message,
        success,
        dismiss
    }
    title: string
    actions: ModalAction[]
    cmpRef: ComponentRef<OnModalAction>
    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    constructor(
        private vcRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        // debugger
        this.euMdParams = data.euMdParams
        this.title = this.euMdParams.title || "弹出表单"
        this.actions = this.euMdParams.modalActions
    }

    onActionClick(action: ModalAction): void {
        // debugger
        if (action.isClose) {
            let result = this.cmpRef.instance.onModalClose()
            if (result instanceof Observable) {
                result.subscribe(data => {
                    this.dialogRef.close()
                    if (this.euMdParams.success) {
                        this.euMdParams.success(data, action)
                    }
                })
            } else {
                this.dialogRef.close()
                if (this.euMdParams.success) {
                    this.euMdParams.success(result, action)
                }
            }

        } else if (action.isCancel) {
            let result = this.cmpRef.instance.onModalDismiss()
            if (result instanceof Observable) {
                result.subscribe(data => {
                    this.dialogRef.close()
                    if (this.euMdParams.dismiss) {
                        this.euMdParams.dismiss(data, action)
                    }
                })
            } else {
                this.dialogRef.close()
                if (this.euMdParams.dismiss) {
                    this.euMdParams.dismiss(result, action)
                }
            }
        } else {
            if (this.cmpRef.instance.onModalAction) {
                let result = this.cmpRef.instance.onModalAction(action)
                if (result instanceof Observable) {
                    result.subscribe(data => {
                        this.dialogRef.close()
                        if (this.euMdParams.success) {
                            this.euMdParams.success(data, action)
                        }
                    })
                } else {
                    this.dialogRef.close()
                    if (this.euMdParams.success) {
                        this.euMdParams.success(result, action)
                    }
                }
            }
        }
    }

    ngOnInit() {
        let component = this.data.euMdParams.component
        let myComponentFactory: ComponentFactory<OnModalAction> = this.componentFactoryResolver.resolveComponentFactory(component)
        this.cmpRef = this.wrapperRef.createComponent(myComponentFactory)
    }
}