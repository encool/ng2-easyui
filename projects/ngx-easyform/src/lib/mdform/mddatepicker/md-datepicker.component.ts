import { Input, Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms'

import { MdDatepickerField } from './md-datepicker.field'
import { UIComponent } from '../../core/decorator/ui-component.decorator'

@UIComponent({
    selector: 'ef-md-datepicker',
    component: MdDatepickerComponent,
    field: MdDatepickerField,
    name: "日期选择"
})
@Component({
    selector: 'ef-md-datepicker',
    template: `
    <mat-form-field [bsCol.sm]="span" [bsCol.xs]="12">
      <input matInput [matDatepicker]="myDatepicker" [placeholder]="label" [formControl]="formControl" [disableControl]="field.disabled">
      <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
      <mat-datepicker [touchUi]="touchUi" #myDatepicker></mat-datepicker>    
      <mat-error *ngIf="formControl.hasError('matDatepickerParse');else elseBlock">
      <strong>时间格式不正确</strong>
      </mat-error>   
      <ng-template #elseBlock>
        <mat-error *ngIf="formControl.hasError('required')">
        <strong>必填项</strong>
        </mat-error>   
      </ng-template>
    </mat-form-field>

    `
})
export class MdDatepickerComponent implements OnInit {

    @Input() field: any;
    @Input() form: FormGroup;

    span: number = 12
    label: string
    touchUi: boolean = false

    eNfxFlex: string
    eNfxFlexXs: string
    formControl: AbstractControl

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.get(this.field.key)
        this.span = this.field.span == undefined ? 4 : this.field.span
        this.label = this.field.label
        this.eNfxFlex = "calc(" + (this.span / 12) * 100 + "% - 15px)"
        // this.eNfxFlexXs = "calc(100% - 15px)"
        this.eNfxFlexXs = "100%"
        this.formControl.valueChanges.subscribe(value => {
            // this
            // debugger
        })
    }

    patchValueToView() {
        // this.model = this.controll.value
    }

    @HostListener('window:resize', ['$event.target.innerWidth'])
    onResize(width) {
        if (width < 720) {
            this.touchUi = true
        } else {
            this.touchUi = false
        }
    }
}