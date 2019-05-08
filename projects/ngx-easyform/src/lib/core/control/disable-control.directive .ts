import { Directive, Input, Optional, Host } from "@angular/core";
import { NgControl, FormGroup } from '@angular/forms';
import { ControlContainer } from "@angular/forms";

@Directive({
    selector: '[disableControl]'

})
export class DisableControlDirective {

    @Input() set disableControl(condition: boolean) {
        setTimeout(() => {
            const action = condition ? 'disable' : 'enable';
            if (this.ngControl) {               
                this.ngControl.control[action]();
            }
            if (this.controlContainer) {
                this.controlContainer.control[action]();
            }
        });
    }

    constructor( @Optional() @Host() private ngControl: NgControl, @Optional() @Host() private controlContainer: ControlContainer) {
        // debugger
    }

}