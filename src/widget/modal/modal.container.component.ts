import { Component, OnInit, Inject, ViewContainerRef, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'modal-container',
    templateUrl: 'modal.container.component.html'
})

export class ModalContainerComponent implements OnInit {

    @ViewChild('wrapper', { read: ViewContainerRef }) wrapperRef: ViewContainerRef;

    constructor(
        public dialogRef: MdDialogRef<any>,
        @Inject(MD_DIALOG_DATA) public data: any) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }
}