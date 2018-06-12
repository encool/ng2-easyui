import {
    ConnectedPositionStrategy,
    Overlay,
    OverlayRef,
    OverlayConfig,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DOCUMENT } from '@angular/common';
import { AbstractControl, NgForm, FormGroupDirective, NgControl, ControlValueAccessor } from "@angular/forms";
import {
    TemplatePortal,
    CdkPortal
} from '@angular/cdk/portal';
import {
    MatFormField,
    ErrorStateMatcher,
    mixinErrorState,
    mixinDisabled,
    MatFormFieldControl,
    mixinTabIndex,
    CanDisable,
    CanUpdateErrorState,
    HasTabIndex,
} from "@angular/material";
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    InjectionToken,
    Input,
    Optional,
    ViewContainerRef,
    Output,
    TemplateRef,
    EventEmitter,
    Self,
    HostBinding,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { defer } from 'rxjs/observable/defer';
import { filter } from 'rxjs/operators/filter';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { TreeWrapComponent } from "./tree-wrapper";
import { AntdTreeComponent } from '../eu-tree-antd';
import { EuTreeNode } from "ng2-easyui.core";

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

/** Change event object that is emitted when the select value has changed. */
export class TreeSelectChange {
    constructor(
        /** Reference to the select that emitted the change event. */
        public source: any,
        /** Current value of the select that emitted the event. */
        public value: {
            id,
            name,
            data?
        }) { }
}

export class MatSelectBase {
    constructor(public _elementRef: ElementRef,
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl) { }
}
export const _MatSelectMixinBase = mixinTabIndex(mixinDisabled(mixinErrorState(MatSelectBase)));

@Component({
    selector: `select-tree`,
    host: {
        'role': 'listbox',
        '[attr.id]': 'id',
        '[attr.tabindex]': 'tabIndex',
        '[attr.aria-label]': '_ariaLabel',
        '[attr.aria-labelledby]': 'ariaLabelledby',
        '[attr.aria-required]': 'required.toString()',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.aria-invalid]': 'errorState',
        '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
        '[attr.aria-multiselectable]': 'multiple',
        '[attr.aria-describedby]': '_ariaDescribedby || null',
        // '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
        '[class.mat-select-disabled]': 'disabled',
        '[class.mat-select-invalid]': 'errorState',
        '[class.mat-select-required]': 'required',
        'class': 'mat-select',
        '(keydown)': '_handleKeydown($event)',
        '(focus)': '_onFocus()',
        '(blur)': '_onBlur()',
    },
    template: `        
    <div class="mat-select-trigger"
        aria-hidden="true">
        <div class="mat-select-value" [ngSwitch]="empty">
            <span class="mat-select-placeholder" *ngSwitchCase="true">{{placeholder || '\u00A0'}}</span>
            <span class="mat-select-value-text" *ngSwitchCase="false">
                <span>{{triggerValue}}</span>
            </span>
        </div>
        <mat-icon matSuffix (click)="clearValue($event)" 
        style="font-size: 14px;height: 18px;width: 18px;display: table-cell;vertical-align: middle;">clear</mat-icon>
        <div class="mat-select-arrow-wrapper"><div class="mat-select-arrow"></div></div>
    </div>`,
    styles: [`.mat-select{display:inline-block;width:100%;outline:0}.mat-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}.mat-select-panel:not([class*=mat-elevation-z]){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}.mat-form-field-hide-placeholder .mat-select-placeholder{color:transparent;transition:none}`],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: MatFormFieldControl, useExisting: SelectTreeInput }],
})
export class SelectTreeInput extends _MatSelectMixinBase implements MatFormFieldControl<any>, ControlValueAccessor {

    static nextId = 0;

    @HostBinding() id = `tree-select-input-${SelectTreeInput.nextId++}`;

    triggerValue: any
    private _overlayRef: OverlayRef | null;
    // private _portal: ComponentPortal<AntdTreeComponent>;
    private _portal: TemplatePortal;

    /** Strategy that is used to position the panel. */
    private _positionStrategy: ConnectedPositionStrategy;

    private _value: string | number | null;
    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue: string | number | null;

    /** The subscription for closing actions (some are bound to document). */
    private _closingActionsSubscription: Subscription;

    private _panelOpen: boolean = false;
    /** Whether or not the overlay panel is open. */
    get panelOpen(): boolean {
        return this._panelOpen;
    }
    /** The tree panel to be attached to this trigger. */
    // @Input('treeTrigger') treeTemplate: TemplateRef<any>;
    @Input('treeTrigger') treeWrap: TreeWrapComponent;
    // @Input('fieldControl') fieldControl: AbstractControl
    @Input('displayValue') displayValue: any

    /** An object used to control when error messages are shown. */
    @Input() errorStateMatcher: ErrorStateMatcher;

    @Output("treeSelectChange") treeSelectChange: EventEmitter<TreeSelectChange> = new EventEmitter()
    /** Opens the autocomplete suggestion panel. */
    openPanel(): void {
        this._attachOverlay();
        // this._floatLabel();
    }

    constructor(private _element: ElementRef, private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        _defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Self() @Optional() public ngControl: NgControl,
        private _changeDetectorRef: ChangeDetectorRef,

        @Inject(MAT_AUTOCOMPLETE_SCROLL_STRATEGY) private _scrollStrategy,
        @Optional() @Host() private _formField: MatFormField,
        @Optional() @Inject(DOCUMENT) private _document: any) {
        super(_element, _defaultErrorStateMatcher, _parentForm,
            _parentFormGroup, ngControl);
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        // Force setter to be called in case id was not specified.
        this.id = this.id;
    }

    stateChanges = new Subject<void>();

    set value(newValue: any | null) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.writeValue(newValue);
        }
    }

    get value() {
        return this._value
    }

    get empty() {
        return !this.value
    }

    get shouldLabelFloat() {
        // console.log("shouldLabelFloat----", this.focused || !this.empty || this.panelOpen)
        // console.log("focused----", this.focused)
        // console.log("!empty----", !this.empty)
        // console.log("panelOpen----", this.panelOpen)
        return this.focused || !this.empty || this.panelOpen;
    }

    @Input()
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    private _required = false;

    /** Handles all keydown events on the select. */
    _handleKeydown(event: KeyboardEvent): void {
        if (!this.disabled) {
            // this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
    }

    @HostBinding('attr.aria-describedby') describedBy = '';

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        this.toggle()
        // if ((event.target as Element).tagName.toLowerCase() != 'input') {
        //   this.elRef.nativeElement.querySelector('input').focus();
        // }
    }

    @Input()
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    private _placeholder: string;

    ngOnDestroy() {
        this.stateChanges.complete();
    }

    ngOnInit() {
        this.treeWrap
    }

    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    toggle() {
        this.panelOpen ? this.closePanel() : this.openPanel();
    }

    private _attachOverlay(): void {
        // if (!this.antTree) {
        // throw getMatAutocompleteMissingPanelError();
        // }
        // debugger
        if (!this._overlayRef) {
            this.generateProtalAndOverlay()
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

    generateProtalAndOverlay() {
        this._portal = new TemplatePortal(this.treeWrap.template, this._viewContainerRef);
        this._overlayRef = this._overlay.create(this._getOverlayConfig());
    }

    /** Closes the autocomplete suggestion panel. */
    closePanel(): void {
        // this._resetLabel();

        if (this._panelOpen) {
            // this.autocomplete._isOpen = this._panelOpen = false;
            this._panelOpen = false;
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.detach();
                this._closingActionsSubscription.unsubscribe();
            }
            this._onTouched()

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
            this.treeCloseStatus,
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
        return this.panelClosingActions.subscribe(event => {
            this._setValueAndClose(event)
        });
    }

    clearValue($event: MouseEvent) {
        $event.stopPropagation()
        this._setValueAndClose({ eventName: 'reset' })
    }
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose(event: any | null): void {
        if (event.node) {
            let data = event.node
            if (this._previousValue !== data.id) {
                this.triggerValue = data.name
                this.value = data.id
                this._onChange(data.id)
                let treeSelectChange = new TreeSelectChange(event, { id: data.id, name: data.name, data: data })
                this.treeSelectChange.emit(treeSelectChange)
            }
        } else if (event.eventName == "reset") {
            let data: any = {}
            if (this._previousValue !== data.id || this._previousValue == undefined) {
                this.triggerValue = data.name
                this.value = data.id
                this._onChange(data.id)
                let treeSelectChange = new TreeSelectChange(event, { id: data.id, name: data.name, data: data })
                this.treeSelectChange.emit(treeSelectChange)
            }
        }
        this.closePanel();
    }

    private get treeCloseStatus(): Observable<any> {
        return merge(
            this.treeWrap.tree.select,
            this.treeWrap.tree.check
        ).pipe(filter((event: any) => {
            // if (event.eventName = "activate") {
            //     return true
            // } else {
            //     return false
            // }
            if (event.node) {
                return true
            } else {
                return false
            }
        }))
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


    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void = () => { };

    /** `View -> model callback called when select has been touched` */
    _onTouched: () => {};
    /**
       * Sets the select's value. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param value New value to be written to the model.
       */
    writeValue(value: any): void {
        if (this.treeWrap && value) {
            if (!this._overlayRef) {
                this.generateProtalAndOverlay()
            }
            // let treeModal = this.treeWrap.tree.nzTree.treeModel
            // let node: any = treeModal.getNodeById(value)
            let node: EuTreeNode = this.treeWrap.tree.getNodeById(value)

            if (node) {
                this.triggerValue = node.name
                this.treeWrap.tree.setActiveNode(node)
                this.value = node.id
            }
        } else if (this.treeWrap && !value) {
            // let treeModal = this.treeWrap.tree.nzTree.treeModel
            // treeModal.setActiveNode({}, false)
            this.treeWrap.tree.setActiveNode(undefined)
        }
        // if (this.options) {
        //   this._setSelectionByValue(value);
        // }
    }

    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        // this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    }

    focused = false
    _onFocus() {
        if (!this.disabled) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur() {
        this.focused = false;

        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    }
}