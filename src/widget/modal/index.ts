import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdDialogModule } from '@angular/material';

import { ModalContainerComponent } from './modal.container.component'
import { MdModalService } from './md-modal.service'

@NgModule({
    imports: [
        CommonModule,
        MdDialogModule
    ],
    exports: [
        ModalContainerComponent
    ],
    declarations: [
        ModalContainerComponent
    ],
    providers: [
        MdModalService
    ],
    entryComponents: [

    ]
})
export class EasyUIagGridModule { }

export * from '././modal.container.component'