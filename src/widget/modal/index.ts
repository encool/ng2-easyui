import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdDialogModule, MdButtonModule } from '@angular/material';

import { ModalContainerComponent } from './modal.container.component'
import { MdModalService } from './md-modal.service'
import { EuModalService } from '../../core/'

@NgModule({
    imports: [
        CommonModule,
        MdDialogModule,
        MdButtonModule
    ],
    exports: [
        ModalContainerComponent
    ],
    declarations: [
        ModalContainerComponent
    ],
    providers: [
        { provide: EuModalService, useClass: MdModalService, },
    ],
    entryComponents: [
        ModalContainerComponent
    ]
})
export class EasyUIMdModalModule {
    static withComponents(components: any): ModuleWithProviders {
        return {
            ngModule: EasyUIMdModalModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ],
        };
    }
}

export * from './modal.container.component'
export * from './md-modal.service'