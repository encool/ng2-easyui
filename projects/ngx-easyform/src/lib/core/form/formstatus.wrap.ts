import { FormGroupDirective } from "@angular/forms"
import { Directive } from "@angular/core";
@Directive({
    selector: "999"
})
export class FormstatusWrap extends FormGroupDirective {
    checked: boolean
}