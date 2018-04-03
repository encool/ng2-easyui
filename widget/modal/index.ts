import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatButtonModule } from '@angular/material';

import { ModalContainerComponent } from './modal.container.component'
import { MessageComponent } from "./message.componet";
import { MdModalService } from './md-modal.service'
import { EuModalService } from 'ng2-easyui.core'

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        ModalContainerComponent
    ],
    declarations: [
        ModalContainerComponent,
        MessageComponent
    ],
    entryComponents: [
        ModalContainerComponent,
        MessageComponent
    ]
})
export class EasyUIMdModalModule {
    static withComponents(components: any): ModuleWithProviders {
        return {
            ngModule: EasyUIMdModalModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true },
                { provide: EuModalService, useClass: MdModalService },
            ],
        };
    }
}

export * from './modal.container.component'
export * from './md-modal.service'