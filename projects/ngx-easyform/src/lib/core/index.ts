import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldControlService } from './field/field.control.service'
import { FormstatusWrap } from './form/formstatus.wrap'
import { DisableControlDirective } from "./control/disable-control.directive ";
import { RequiredControlDirective } from "./control/required-control.directive";
import { EfDateAdapter } from "./datetime/date-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";


@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        DisableControlDirective,
        RequiredControlDirective,
    ],
    declarations: [
        //avoid aot fails,ugly
        FormstatusWrap,
        DisableControlDirective,
        RequiredControlDirective,
    ],
    providers: [
        FieldControlService,
        // { provide: DateAdapter, useClass: EfDateAdapter }

    ],
    entryComponents: [],
})
export class EasyFormCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: EasyFormCoreModule,
            providers: [
                FieldControlService,
                { provide: DateAdapter, useClass: EfDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
            ],
        }
    }
}

export { FieldControlService } from './field/field.control.service'
export { uilist, uimap, uimap1, UIComponent } from './decorator/ui-component.decorator'
export { FormstatusWrap } from './form/formstatus.wrap'
export { EfDictdataService } from './service/dictdata.service'
export { FieldBase } from './field/field-base'
export { FieldArray } from './field/field-array'
export { InputField } from './field/input.field'
export { FieldGroup } from './field/field-group'
export { OptionsField } from './field/options.field'
export { QueryOperate } from './field/query-operate'
export { CommonField } from './field/common.field'
