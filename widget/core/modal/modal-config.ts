import { Type, ViewContainerRef } from '@angular/core'
import { ModalAction } from './modal.action'
export declare class ModalConfig {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;
    /** ID for the dialog. If omitted, a unique one will be generated. */
    id?: string;
    /** The ARIA role of the dialog element. */
    // role?: DialogRole;
    /** Custom class for the overlay pane. */
    panelClass?: string | string[];
    /** Whether the dialog has a backdrop. */
    hasBackdrop?: boolean;
    /** Custom class for the backdrop, */
    backdropClass?: string;
    /** Whether the user can use escape or clicking outside to close a modal. */
    disableClose?: boolean;
    /** Width of the dialog. */
    width?: string;

    component?: Type<any>
    /** Height of the dialog. */
    height?: string;
    modalActions?: ModalAction[]
    title?: string;
    message?: string;
    /** Position overrides. */
    position?: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
    /** Data being injected into the child component. */
    data?: any;
    /** Layout direction for the dialog's content. */
    // direction?: Direction;
    /** ID of the element that describes the dialog.  */
    ariaDescribedBy?: string | null;
}