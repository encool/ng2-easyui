import { Component, Inject, ViewContainerRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import {
    OnModalAction, TreeEvent, CURDAction
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'

// import { EasyUIMdModalModule, MdModalService, ModalConfig } from '../../../'

import { MdTextinputField, FieldBase, MdFormComponent } from 'ng2-easyform'
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material"

@Component({
    selector: 'dialog-data-example-dialog',
    template: `
    <ef-md-form [fields]="fields"></ef-md-form>
  `,
})
// 信息编辑弹出框
export class TreeModalComponent implements OnModalAction {

    ege: TreeEvent
    action: CURDAction
    fields: FieldBase<any>[]
    @ViewChild(MdFormComponent) infoForm: MdFormComponent
    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
        this.ege = data.euTreeEvent
        this.action = this.ege.action
        //编辑获取数据
        if (this.action == CURDAction.UPDATE) {
            // (this.euPageService as any).getById(this.ege.activeNodes[0].id).subscribe(value => {
            //     // debugger
            //     this.infoForm.form.patchValue(value)
            // })
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

    //确定
    onModalClose() {
        if (this.action == CURDAction.UPDATE) {
            return new Observable(observer => {
                // (this.euPageService as any).updateById(this.ege.rowId, this.infoForm.form.value).subscribe((value) => {
                //     observer.next(value);
                // })
            });
        } else if (this.action == CURDAction.CREATE) {
            return new Observable(observer => {
                // (this.euPageService as any).addData(this.infoForm.form.value).subscribe((value) => {
                //     observer.next(value);
                // })
            });
        }
    }

    onModalDismiss() {
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(43);
            }, 100);
        });
    }
}
