import { Component, Input, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from "rxjs";

import { UIComponent } from '../../core/decorator/ui-component.decorator'
import { EfDictdataService } from '../../core/service/dictdata.service'
import { MdRadioGroupField } from "./md-radio-group.field";

@UIComponent({
    selector: 'ef-md-radios',
    component: MdRadioGroupComponent,
    field: MdRadioGroupField,
    name: "RadiosGroup"
})
@Component({
    selector: 'ef-md-radios',
    template: `
    <mat-radio-group [bsCol.sm]="span" [bsCol.xs]="12" [formControl]="controll" [disableControl]="field.disabled">
        <mat-radio-button *ngFor="let option of options" [value]="option[optionId]">
            {{ option[optionName] }}
        </mat-radio-button>
    </mat-radio-group>   
    `
})
export class MdRadioGroupComponent implements OnInit {
    @Input() isEasyForm: boolean = true
    @Input() key: string = 'dropdowninput'
    @Input() label: string = ''
    @Input() span: number = 4
    @Input() offset: number = 0
    @Input() hidden: boolean = false
    @Input() disabled: boolean = false
    @Input() optionsOb: Observable<any>
    @Input() options: any[] = []
    @Input() optionId: string = 'key'
    @Input() optionName: string = 'value'
    @Input() multiple: boolean = false
    @Input() noneOption: boolean = true


    @Input() field: MdRadioGroupField;
    @Input() form: FormGroup;
    @Input() model: any;

    controll: AbstractControl
    dictName: string

    constructor(private efDictdataService: EfDictdataService) {

    }

    ngOnInit() {
        if (this.isEasyForm) {
            this.label = this.field.label
            this.key = this.field.key
            this.field._view = this
            this.controll = this.field._control = this.form.get(this.field.key)
            this.controll.statusChanges.subscribe(data => {
                if (this.field.statusChange instanceof Function) {
                    this.field.statusChange(data)
                }
            })
            this.controll.valueChanges.subscribe(data => {
                if (this.field.valueChange instanceof Function) {
                    this.field.valueChange(data)
                }
            })

            this.span = this.field.span == undefined ? 4 : this.field.span

            this.noneOption = this.field.noneOption
            // this.dictName = this.field.dictName || (this.field.params.primaryField ? this.field.params.primaryField.dictName : undefined)
            this.dictName = this.field.dictName

            this.optionId = this.field.optionId
            this.optionName = this.field.optionName
            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.options = data)
                } else if (this.dictName) {
                    this.efDictdataService.getDictDataObserable(this.dictName).subscribe(data => this.options = data)
                    this.optionId = 'dictdataName'
                    this.optionName = 'dictdataValue'
                }
            } else {
                if (!(this.field.options instanceof Array)) {
                    this.optionId = 'key'
                    this.optionName = 'value'
                    setTimeout(() => {
                        this.options = this.transform(this.field.options)
                    });
                } else {
                    this.options = this.field.options
                }
            }
        } else {
            if (this.options.length == 0 && this.optionsOb) {
                this.optionsOb.subscribe(data => this.options = data)
            }
        }
    }

    transform(value) {
        let keys: any = [];
        for (let key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    }
}