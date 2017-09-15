import { NgModule } from '@angular/core';
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
export class EasyUIMdModalModule { }

export * from './modal.container.component'
export * from './md-modal.service'