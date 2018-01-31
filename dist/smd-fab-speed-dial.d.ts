import { EventEmitter, AfterContentInit, ElementRef, Renderer, QueryList, Injector } from "@angular/core";
import { MatButton } from "@angular/material/button";
export declare class SmdFabSpeedDialTrigger {
    /**
     * Whether this trigger should spin (360dg) while opening the speed dial
     */
    spin: boolean;
    private readonly _parent;
    constructor(injector: Injector);
    _onClick(event: any): void;
}
export declare class SmdFabSpeedDialActions implements AfterContentInit {
    private renderer;
    _buttons: QueryList<MatButton>;
    private readonly _parent;
    constructor(injector: Injector, renderer: Renderer);
    ngAfterContentInit(): void;
    private initButtonStates();
    show(): void;
    hide(): void;
    private getTranslateFunction(value);
    private changeElementStyle(elem, style, value);
}
export declare class SmdFabSpeedDialComponent implements AfterContentInit {
    private elementRef;
    private renderer;
    private isInitialized;
    private _direction;
    private _open;
    private _animationMode;
    /**
     * Whether this speed dial is fixed on screen (user cannot change it by clicking)
     */
    fixed: boolean;
    /**
     * Whether this speed dial is opened
     */
    open: boolean;
    /**
     * The direction of the speed dial. Can be 'up', 'down', 'left' or 'right'
     */
    direction: string;
    /**
     * The animation mode to open the speed dial. Can be 'fling' or 'scale'
     */
    animationMode: string;
    openChange: EventEmitter<boolean>;
    _childActions: SmdFabSpeedDialActions;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngAfterContentInit(): void;
    /**
     * Toggle the open state of this speed dial
     */
    toggle(): void;
    _onClick(): void;
    setActionsVisibility(): void;
    private _setElementClass(elemClass, isAdd);
}
/** Speed dial module. */
export declare class SmdFabSpeedDialModule {
}
