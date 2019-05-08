import {
    Component, Type, Input, OnInit, ViewChild,
    AfterViewInit, SimpleChange, ViewContainerRef,
    ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AntFieldBase } from './core/ant-field-base';
import { AntFieldGroup } from './fieldgroup/ant-field-group'

import { uimap } from '../core/decorator/ui-component.decorator'


@Component({
    selector: 'ef-ant-fields',
    template: `
        <ng-template #wrapper>
        </ng-template>    
    `
})
export class AntFieldsComponent implements OnInit, AfterViewInit {
    @Input() fields: AntFieldBase<any>[];
    @Input() form: FormGroup;
    @Input() model: any;


    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    _tipmsg: string = "必填项";

    constructor(private vcRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver, ) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngAfterViewChecked() {

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        // debugger
        if (changes['fields'] && changes['fields'].currentValue) {
            // debugger
            setTimeout(() => {
                this.wrapperRef.clear()
                this.fields.forEach((field) => {
                    
                    let comp: Type<any> = uimap.get(field.selector)
                    //没有找到对应的模板
                    if (!comp) {
                        comp = uimap.get("m-custom")
                    }
                    let myComponentFactory
                    try {
                        myComponentFactory
                            = this.componentFactoryResolver.resolveComponentFactory(comp)

                    } catch (error) {//业务模块的模板解析不出来
                        console.error(error)
                        console.warn("create component error:" + comp)
                        comp = uimap.get("m-custom")
                        myComponentFactory
                            = this.componentFactoryResolver.resolveComponentFactory(comp)
                    }
                    let cmpRef: ComponentRef<any>

                    //直接插到最后面 外面排好序再进来
                    cmpRef = this.wrapperRef.createComponent(myComponentFactory)
                    // debugger
                    cmpRef.instance.isEasyForm = true
                    cmpRef.instance.form = this.form
                    cmpRef.instance.field = field
                })
                // let value = this.form.value
                // console.log("form object after fields attach",this.form.controls)
                // console.log("fields attach formvalue-->", value)
                // this.form.patchValue(value)
            });
        }
    }

    // getCustomTemplateFields(): FieldBase<any>[] {
    //     let cstmTpltfields: FieldBase<any>[] = new Array<FieldBase<any>>()
    //     this.fields.forEach((field) => {
    //         if (field.controlType == "customtemplate") {
    //             cstmTpltfields.push(field)
    //         }
    //     })
    //     return cstmTpltfields
    // }
}