import { Component, Input, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MdSelectField } from './md-select.field'
import { UIComponent } from '../../core/decorator/ui-component.decorator'
import { EfDictdataService } from '../../core/service/dictdata.service'
// [(ngModel)]="model" 
@UIComponent({
    selector: 'ef-md-select',
    component: MdSelectComponent,
    field: MdSelectField,
    name: "选择框"
})
@Component({
    selector: 'ef-md-select',
    template: `
    <mat-form-field [bsCol.sm]="span" [bsCol.xs]="12" style="min-height: 51px;padding-top: 0px;">
        <mat-select
            [placeholder]="label"            
            [formControl]="controll"
            floatPlaceholder="never"
            [multiple]="multiple" 
            [disableControl]="field.disabled"
            (change)=OnChange($event)>           
            <mat-option *ngIf="noneOption">无</mat-option>
            <mat-option *ngFor="let option of options" [value]="option[optionId]">{{ option[optionName] }}</mat-option>
        </mat-select>  
        <mat-error *ngIf="controll.hasError('required')">
        <strong>必填项</strong>
        </mat-error>          
    </mat-form-field>       
    `,
})
export class MdSelectComponent implements OnInit {
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


    @Input() field: MdSelectField;
    @Input() form: FormGroup;
    @Input() model: any;

    controll: AbstractControl
    dictName: string

    eNfxFlex: string
    eNfxFlexXs: string

    classExpression: any = {}

    constructor(private http: HttpClient, private efDictdataService: EfDictdataService) {

    }

    ngOnInit() {
        // debugger
        if (this.isEasyForm) {
            this.label = this.field.label
            this.key = this.field.key
            this.field._view = this
            this.controll = this.field._control = this.form.get(this.field.key)
            this.span = this.field.span == undefined ? 4 : this.field.span
            this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
            // this.eNfxFlexXs = "calc(100% - 15px)"
            this.eNfxFlexXs = "100%"
            this.multiple = MdSelectComponent.isMutipleField(this.field)
            this.noneOption = this.field.noneOption
            // this.dictName = this.field.dictName || (this.field.params.primaryField ? this.field.params.primaryField.dictName : undefined)
            this.dictName = this.field.dictName

            this.patchValueToView()
            this.controll.valueChanges.forEach(
                (data) => {
                    this.patchValueToView()
                }
            )
            this.optionId = this.field.optionId
            this.optionName = this.field.optionName
            if (this.field.options == undefined
                || this.field.options.length == 0) {
                if (this.field.optionsOb) {
                    this.field.optionsOb.subscribe(data => this.options = data)
                } else if (this.dictName) {
                    this.getDictDataObserable(this.dictName).subscribe(data => this.options = data)
                    this.optionId = 'dictdataName'
                    this.optionName = 'dictdataValue'
                }
            } else {
                this.options = this.field.options
            }
        } else {
            if (this.options.length == 0 && this.optionsOb) {
                this.optionsOb.subscribe(data => this.options = data)
            }
        }

        this.classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.isEasyForm) {
            this.classExpression["col-sm-" + this.span] = true;
            this.classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            let span = this.field.span || 4
            this.classExpression["col-sm-" + span] = true;
        }

    }

    patchValueToView() {
        //contrll value 是个数组 保存用逗号分隔的字符串
        if (this.controll.value && this.multiple && typeof this.controll.value == 'string') {
            let v: string = this.controll.value
            this.model = v.split(',')
        } else if (this.controll.value && !this.multiple) {
            this.model = this.controll.value
        } else {
            this.model = {}
        }
    }

    OnChange(change) {
        let value
        if (this.multiple) {
            value = change.value.join(",")
        } else {
            value = change.value
        }
        this.form.patchValue(
            {
                [this.key]: value
            }
        )
    }

    ngclasses() {
        let classExpression = {
            'form-group': true,
            // 'row': true
            // 'has-error':!this.isValid,
        }
        if (this.isEasyForm) {
            classExpression["col-sm-" + this.span] = true;
            classExpression["col-md-offset-" + this.offset] = this.offset == 0 ? false : true;
        } else {
            let span = this.field.span || 4
            classExpression["col-sm-" + span] = true;
        }
        return classExpression
    }

    getDictDataObserable(dictName: string): Observable<any[]> {
        return this.efDictdataService.getDictDataObserable(dictName)
    }

    getDataSourceObserable(url: string): Observable<any[]> {
        let urlSearchParams = new URLSearchParams();
        //urlSearchParams.set('dictTypeName', dictName);
        // urlSearchParams.set('', );
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = {
            headers: headers,
            search: urlSearchParams
        };
        return this.http.get<any[]>(url, options)

    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes['field'] && changes['field'].currentValue) {
        //     debugger
        // }
    }

    getOptionObj(optionId: string) {
        if (this.field.options && this.field.options.length > 0) {
            this.field.options.forEach(option => {
                if (option[this.field.optionId] == optionId) {
                    return option
                }
            })
        } else if (this.options && this.options.length > 0) {
            this.options.forEach(option => {
                if (option[this.optionId] == optionId) {
                    return option
                }
            })
        }
        return null
    }

    static handleValue(type: string, input: any, field): any {
        switch (type) {
            case 'in':
                if (typeof input === 'string' && MdSelectComponent.isMutipleField(field)) {
                    return input.split(',')
                } else if (input == null) {
                    return []
                } else {
                    return input
                }
            case 'out':
                if (Array.isArray(input)) {
                    return input.join(',')
                } else {
                    return input
                }

            default:
                break;
        }
    }

    static isMutipleField(field) {
        if (field.multiple != undefined) {
            return field.multiple
        } else {
            return field.params.primaryField.multiple ||
                field.params.primaryField.webDisplayTypeId === "Select2Component" //电脑端的多选组件
        }
    }
}