import { Directive, Input, Optional, Host } from "@angular/core";
import { NgControl, FormGroup, ControlContainer, Validators } from '@angular/forms';

@Directive({
    selector: '[requiredControl]'

})
export class RequiredControlDirective {

    @Input() set requiredControl(condition: boolean) {
        setTimeout(() => {
            const action = condition ? 'disable' : 'enable';
            debugger
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