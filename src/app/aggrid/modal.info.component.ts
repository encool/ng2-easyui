import { Component, Inject, ViewContainerRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { OnModalAction, EuGridEvent, EuGridAction, EuPageService } from '../../../'
// import { EasyUIMdModalModule, MdModalService, ModalConfig } from '../../../'

import { MdTextinputField, FieldBase, MdFormComponent } from 'ng2-easyform'
import { MD_DIALOG_DATA, MdDialog } from "@angular/material"

@Component({
    selector: 'dialog-data-example-dialog',
    template: `
    <ef-md-form [fields]="fields"></ef-md-form>
  `,
})
export class ModalInfoComponent implements OnModalAction {

    ege: EuGridEvent
    action: EuGridAction
    fields: FieldBase<any>[]
    @ViewChild(MdFormComponent) infoForm: MdFormComponent
    constructor( @Inject(MD_DIALOG_DATA) public data: any, private euPageService: EuPageService) {
        debugger
        this.ege = data.euGridEvent
        this.action = this.ege.action
        if (this.action == EuGridAction.UPDATE) {
            (this.euPageService as any).getById(this.ege.rowId).subscribe(value => {
                debugger
                this.infoForm.form.patchValue(value)
            })
        }
        this.fields = [
            new MdTextinputField({
                key: "categoryNo",
                label: "编号",
                span: 6
            }),
            new MdTextinputField({
                key: "categoryName",
                label: "名称",
                span: 6
            }),
            new MdTextinputField({
                key: "url",
                label: "URL",
                span: 6
            }),
        ]
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
