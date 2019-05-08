import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AntFieldBase } from './core/ant-field-base';
import { AntFieldGroup } from './fieldgroup/ant-field-group'
import { FieldControlService } from '../core/field/field.control.service';

@Component({
    selector: 'ef-ant-form',
    template: `
    <div nz-row>   
        <form nz-form [nzLayout]="nzLayout" (ngSubmit)="onSubmit()" [formGroup]="form">
            <ef-ant-fields [fields]="fields" [form]="form" [model]="model"></ef-ant-fields>
        </form>    
    </div>
    `,
    // providers: [FieldControlService]
})
export class AntFormComponent implements OnInit {
    @Input() fields: AntFieldBase<any>[] = [];
    @Input() model: any = {};
    @Input() nzLayout: string = 'horizontal'

    @ViewChild(FormGroupDirective) ngForm: FormGroupDirective
    form: FormGroup;
    payLoad = '';
    constructor(private fcs: FieldControlService) {

    }
    ngOnInit() {
        // this.fields = _.sortBy(this.fields, "order");
        this.form = this.fcs.toFormGroup(this.fields);
    }

    ngAfterViewInit() {
        if (this.model) {
            setTimeout(() => {
                this.form.patchValue(this.model)
                // this.form.updateValueAndValidity()
            }, 0)
        }
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['fields'] && changes['fields'].currentValue) {
            // _.sortBy(this.fields, "order");
            this.form = this.fcs.toFormGroup(changes['fields'].currentValue)
        }
        if (changes['nzLayout'] && changes['nzLayout'].currentValue) {
            let value = changes['nzLayout'].currentValue
            let isHorizontal: boolean
            if (value && value == "horizontal") {
                isHorizontal = true
            } else {
                isHorizontal = false
            }
            setTimeout(() => {
                this.setFieldsHorizontal(this.fields, isHorizontal)
            });
        }
    }

    setFieldsHorizontal(fields: any[], isHorizontal: boolean) {
        fields.forEach(v => {
            if (v instanceof AntFieldGroup) {
                this.setFieldsHorizontal(v.fields, isHorizontal)
            } else {
                v.isHorizontal = isHorizontal
            }
        })

    }

    getField(fieldNo: string): AntFieldBase<any> {
        let result = null
        this.fields.forEach(v => {
            if (v.key == fieldNo) {
                result = v
            }
        })
        return result
    }

}
