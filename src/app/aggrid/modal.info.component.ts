import { Component, Inject, ViewContainerRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import {
    OnModalAction, EuGridEvent, EuGridAction, EuPageService
    // } from 'ng2-easyui'
} from 'ng2-easyui.core'

// import { EasyUIMdModalModule, MdModalService, ModalConfig } from '../../../'

import { MdTextinputField, FieldBase, MdFormComponent } from 'ng2-easyform'
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material"
import { BaseAction } from '../../../widget/core';

@Component({
    selector: 'dialog-data-example-dialog',
    template: `
    <ef-md-form [fields]="fields"></ef-md-form>
  `,
})
// 信息编辑弹出框
export class ModalInfoComponent implements OnModalAction {

    ege: EuGridEvent
    action: BaseAction
    fields: FieldBase<any>[]
    @ViewChild(MdFormComponent) infoForm: MdFormComponent
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private euPageService: EuPageService) {
        this.ege = data.euGridEvent
        this.action = this.ege.action
        //编辑获取数据
        if (this.action == EuGridAction.UPDATE) {
            (this.euPageService as any).getById(this.ege.rowId).subscribe(value => {
                // debugger
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

    //确定
    onModalClose() {
        if (this.action == EuGridAction.UPDATE) {
            return new Observable(observer => {
                (this.euPageService as any).updateById(this.ege.rowId, this.infoForm.form.value).subscribe((value) => {
                    observer.next(value);
                })
            });
        } else if (this.action == EuGridAction.CREATE) {
            return new Observable(observer => {
                (this.euPageService as any).addData(this.infoForm.form.value).subscribe((value) => {
                    observer.next(value);
                })
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
