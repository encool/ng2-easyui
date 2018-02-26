import {
    ConnectedPositionStrategy,
    Overlay,
    OverlayRef,
    OverlayConfig,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
    TemplatePortal,
    CdkPortal
} from '@angular/cdk/portal';
import {
    MatFormField,
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
    Optional,
    ViewContainerRef,
    Output,
    TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operators/filter';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { AntdTreeComponent } from "../eu-tree-antd/antd-tree.component";

/** Injection token that determines the scroll handling while the autocomplete panel is open. */
export const MAT_AUTOCOMPLETE_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('select-tree-scroll-strategy');

/** @docs-private */
export function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
    () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = {
    provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Directive({
    selector: `input[treeTrigger], textarea[treeTrigger]`,
    host: {
        'role': 'combobox',
        'autocomplete': 'off',
        'aria-autocomplete': 'list',
        // '[attr.aria-activedescendant]': 'activeOption?.id',
        // '[attr.aria-expanded]': 'panelOpen.toString()',
        // '[attr.aria-owns]': 'autocomplete?.id',
        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
        // a little earlier. This avoids issues where IE delays the focusing of the input.
        '(focusin)': '_handleFocus()',
        // '(blur)': '_onTouched()',
        '(input)': '_handleInput($event)',
        // '(keydown)': '_handleKeydown($event)',
    },
    exportAs: 'treeTrigger',
    providers: []
})
export class SelectTreeTrigger {

    private _overlayRef: OverlayRef | null;
    // private _portal: ComponentPortal<AntdTreeComponent>;
    private _portal: TemplatePortal;

    /** Strategy that is used to position the panel. */
    private _positionStrategy: ConnectedPositionStrategy;

    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue: string | number | null;

    /** The subscription for closing actions (some are bound to document). */
    private _closingActionsSubscription: Subscription;

    private _panelOpen: boolean = false;
    /** The tree panel to be attached to this trigger. */
    @Input('treeTrigger') treeTemplate: TemplateRef<any>;
    @Input('treeComponent') tree: AntdTreeComponent;

    /** Opens the autocomplete suggestion panel. */
    openPanel(): void {
        this._attachOverlay();
        // this._floatLabel();
    }

    constructor(private _element: ElementRef, private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        @Inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY) private _scrollStrategy,
        @Optional() @Host() private _formField: MatFormField,
        @Optional() @Inject(DOCUMENT) private _document: any) {

    }

    ngOnInit() {
        debugger
        this.tree
    }

    private _attachOverlay(): void {
        // if (!this.antTree) {
        // throw getMatAutocompleteMissingPanelError();
        // }
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.treeTemplate, this._viewContainerRef);
            // this._portal = new ComponentPortal(AntdTreeComponent, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef.backdropClick().subscribe
        } else {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.updateSize({ width: this._getHostWidth() });
        }

        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }

        // const wasOpen = this.panelOpen;

        // this.antTree._setVisibility();
        // this.antTree._isOpen = this._panelOpen = true;
        this._panelOpen = true;

        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        // if (this.panelOpen && wasOpen !== this.panelOpen) {
        //     this.autocomplete.opened.emit();
        // }
    }

    /** Closes the autocomplete suggestion panel. */
    closePanel(): void {
        // this._resetLabel();

        if (this._panelOpen) {
            // this.autocomplete._isOpen = this._panelOpen = false;
            this._panelOpen = false;
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.detach();
                // this._closingActionsSubscription.unsubscribe();
            }

            // Note that in some cases this can end up being called after the component is destroyed.
            // Add a check to ensure that we don't try to run change detection on a destroyed view.
            // if (!this._componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            // this._changeDetectorRef.detectChanges();
            // }
        }
    }

    _handleInput(event: KeyboardEvent): void {
        let target = event.target as HTMLInputElement;
        let value: number | string | null = target.value;

        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value == '' ? null : parseFloat(value);
        }

        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this._canOpen() && this._previousValue !== value &&
            document.activeElement === event.target) {
            this._previousValue = value;
            // this._onChange(value);
            this.openPanel();
        }
    }

    _handleFocus(): void {
        if (this._canOpen()) {
            this._previousValue = this._element.nativeElement.value;
            this._attachOverlay();
            // this._floatLabel(true);
        }
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
        return this._formField ? this._formField._connectionContainerRef : this._element;
        // return this._element;
    }

    /** Returns the width of the input element, so the panel width can match it. */
    private _getHostWidth(): number {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }

    /** Determines whether the panel can be opened. */
    private _canOpen(): boolean {
        const element: HTMLInputElement = this._element.nativeElement;
        return !element.readOnly && !element.disabled;
    }

    get panelClosingActions(): Observable<any> {
        return merge(
            this.tree.nzTree.nzStateChange,
            // this.optionSelections,
            // this.autocomplete._keyManager.tabOut.pipe(filter(() => this._panelOpen)),
            // this._closeKeyEventStream,
            this._outsideClickStream,
            this._overlayRef ?
                this._overlayRef.detachments().pipe(filter(() => this._panelOpen)) :
                observableOf()
        );
    }
    private _subscribeToClosingActions(): Subscription {
        return this.panelClosingActions.subscribe(event => this._setValueAndClose(event));
    }
    /**
 * This method closes the panel, and if a value is specified, also sets the associated
 * control to that value. It will also mark the control as dirty if this interaction
 * stemmed from the user.
 */

    private _setValueAndClose(event: any | null): void {
        debugger
        this.closePanel();
    }
    /** Stream of clicks outside of the autocomplete panel. */
    private get _outsideClickStream(): Observable<any> {
        if (!this._document) {
            return observableOf(null);
        }

        return merge(
            fromEvent(this._document, 'click'),
            fromEvent(this._document, 'touchend')
        )
            .pipe(filter((event: MouseEvent | TouchEvent) => {
                const clickTarget = event.target as HTMLElement;
                const formField = this._formField ?
                    this._formField._elementRef.nativeElement : null;

                return this._panelOpen &&
                    clickTarget !== this._element.nativeElement &&
                    (!formField || !formField.contains(clickTarget)) &&
                    (!!this._overlayRef && !this._overlayRef.overlayElement.contains(clickTarget));
            }));
    }
}