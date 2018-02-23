import {
    ConnectedPositionStrategy,
    Overlay,
    OverlayRef,
    OverlayConfig,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import {
    MatFormField,
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY
} from "@angular/material";
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    InjectionToken,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    ViewContainerRef,
} from '@angular/core';
import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";

@Directive({
    selector: `input[antTree], textarea[antTree]`,
    host: {
        'role': 'combobox',
        'autocomplete': 'off',
        'aria-autocomplete': 'list',
        // '[attr.aria-activedescendant]': 'activeOption?.id',
        // '[attr.aria-expanded]': 'panelOpen.toString()',
        // '[attr.aria-owns]': 'autocomplete?.id',
        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
        // a little earlier. This avoids issues where IE delays the focusing of the input.
        // '(focusin)': '_handleFocus()',
        // '(blur)': '_onTouched()',
        // '(input)': '_handleInput($event)',
        // '(keydown)': '_handleKeydown($event)',
    },
    exportAs: 'antTreeTrigger',
    providers: []
})
export class SelectTreeTrigger {

    // @Input("antTree") antTree: AntdTreeComponent
    private _overlayRef: OverlayRef | null;
    private _portal: ComponentPortal<AntdTreeComponent>;

    /** Strategy that is used to position the panel. */
    private _positionStrategy: ConnectedPositionStrategy;

    /** Opens the autocomplete suggestion panel. */
    openPanel(): void {
        this._attachOverlay();
        // this._floatLabel();
    }

    constructor(private _element: ElementRef, private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        @Inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY) private _scrollStrategy,
        @Optional() @Host() private _formField: MatFormField, ) {

    }

    private _attachOverlay(): void {
        // if (!this.antTree) {
        // throw getMatAutocompleteMissingPanelError();
        // }

        if (!this._overlayRef) {
            // let type = new ComponentType()
            this._portal = new ComponentPortal(AntdTreeComponent, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
        } else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.updateSize({ width: this._getHostWidth() });
        }

        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            // this._closingActionsSubscription = this._subscribeToClosingActions();
        }

        // const wasOpen = this.panelOpen;

        // this.antTree._setVisibility();
        // this.antTree._isOpen = this._panelOpen = true;

        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        // if (this.panelOpen && wasOpen !== this.panelOpen) {
        //     this.autocomplete.opened.emit();
        // }
    }

    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this._scrollStrategy(),
            width: this._getHostWidth(),
            // direction: this._dir ? this._dir.value : 'ltr'
            direction: 'ltr'
        });
    }

    private _getOverlayPosition(): PositionStrategy {
        this._positionStrategy = this._overlay.position().connectedTo(
            this._getConnectedElement(),
            { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })
            .withFallbackPosition(
            { originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }
            );
        return this._positionStrategy;
    }

    private _getConnectedElement(): ElementRef {
        // return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
        return this._element;
    }

    /** Returns the width of the input element, so the panel width can match it. */
    private _getHostWidth(): number {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }
}