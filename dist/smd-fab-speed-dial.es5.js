"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var Z_INDEX_ITEM = 23;
var SmdFabSpeedDialTrigger = (function () {
    function SmdFabSpeedDialTrigger(injector) {
        /**
             * Whether this trigger should spin (360dg) while opening the speed dial
             */
        this.spin = false;
        this._parent = injector.get(SmdFabSpeedDialComponent);
    }
    SmdFabSpeedDialTrigger.prototype._onClick = function (event) {
        if (!this._parent.fixed) {
            this._parent.toggle();
            event.stopPropagation();
        }
    };
    SmdFabSpeedDialTrigger.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'smd-fab-trigger',
                    template: "\n\t\t<ng-content select=\"[md-fab], [mat-fab]\"></ng-content>\n\t"
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialTrigger.ctorParameters = function () { return [
        { type: core_1.Injector, },
    ]; };
    SmdFabSpeedDialTrigger.propDecorators = {
        "spin": [{ type: core_1.HostBinding, args: ['class.smd-spin',] }, { type: core_1.Input },],
        "_onClick": [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    };
    return SmdFabSpeedDialTrigger;
}());
exports.SmdFabSpeedDialTrigger = SmdFabSpeedDialTrigger;
var SmdFabSpeedDialActions = (function () {
    function SmdFabSpeedDialActions(injector, renderer) {
        this.renderer = renderer;
        this._parent = injector.get(SmdFabSpeedDialComponent);
    }
    SmdFabSpeedDialActions.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._buttons.changes.subscribe(function () {
            _this.initButtonStates();
            _this._parent.setActionsVisibility();
        });
        this.initButtonStates();
    };
    SmdFabSpeedDialActions.prototype.initButtonStates = function () {
        var _this = this;
        this._buttons.toArray().forEach(function (button, i) {
            _this.renderer.setElementClass(button._getHostElement(), 'smd-fab-action-item', true);
            _this.changeElementStyle(button._getHostElement(), 'z-index', '' + (Z_INDEX_ITEM - i));
        });
    };
    SmdFabSpeedDialActions.prototype.show = function () {
        var _this = this;
        if (this._buttons) {
            this._buttons.toArray().forEach(function (button, i) {
                var transitionDelay = 0;
                var transform;
                if (_this._parent.animationMode == 'scale') {
                    // Incremental transition delay of 65ms for each action button
                    transitionDelay = 3 + (65 * i);
                    transform = 'scale(1)';
                }
                else {
                    transform = _this.getTranslateFunction('0');
                }
                _this.changeElementStyle(button._getHostElement(), 'transition-delay', transitionDelay + 'ms');
                _this.changeElementStyle(button._getHostElement(), 'opacity', '1');
                _this.changeElementStyle(button._getHostElement(), 'transform', transform);
            });
        }
    };
    SmdFabSpeedDialActions.prototype.hide = function () {
        var _this = this;
        if (this._buttons) {
            this._buttons.toArray().forEach(function (button, i) {
                var opacity = '1';
                var transitionDelay = 0;
                var transform;
                if (_this._parent.animationMode == 'scale') {
                    transitionDelay = 3 - (65 * i);
                    transform = 'scale(0)';
                    opacity = '0';
                }
                else {
                    transform = _this.getTranslateFunction((55 * (i + 1) - (i * 5)) + 'px');
                }
                _this.changeElementStyle(button._getHostElement(), 'transition-delay', transitionDelay + 'ms');
                _this.changeElementStyle(button._getHostElement(), 'opacity', opacity);
                _this.changeElementStyle(button._getHostElement(), 'transform', transform);
            });
        }
    };
    SmdFabSpeedDialActions.prototype.getTranslateFunction = function (value) {
        var dir = this._parent.direction;
        var translateFn = (dir == 'up' || dir == 'down') ? 'translateY' : 'translateX';
        var sign = (dir == 'down' || dir == 'right') ? '-' : '';
        return translateFn + '(' + sign + value + ')';
    };
    SmdFabSpeedDialActions.prototype.changeElementStyle = function (elem, style, value) {
        // FIXME - Find a way to create a "wrapper" around the action button(s) provided by the user, so we don't change it's style tag
        this.renderer.setElementStyle(elem, style, value);
    };
    SmdFabSpeedDialActions.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'smd-fab-actions',
                    template: "\n\t\t<ng-content select=\"[md-mini-fab], [mat-mini-fab]\"></ng-content>\n\t"
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialActions.ctorParameters = function () { return [
        { type: core_1.Injector, },
        { type: core_1.Renderer, },
    ]; };
    SmdFabSpeedDialActions.propDecorators = {
        "_buttons": [{ type: core_1.ContentChildren, args: [button_1.MatButton,] },],
    };
    return SmdFabSpeedDialActions;
}());
exports.SmdFabSpeedDialActions = SmdFabSpeedDialActions;
var SmdFabSpeedDialComponent = (function () {
    function SmdFabSpeedDialComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isInitialized = false;
        this._direction = 'up';
        this._open = false;
        this._animationMode = 'fling';
        /**
             * Whether this speed dial is fixed on screen (user cannot change it by clicking)
             */
        this.fixed = false;
        this.openChange = new core_1.EventEmitter();
    }
    Object.defineProperty(SmdFabSpeedDialComponent.prototype, "open", {
        get: /**
             * Whether this speed dial is opened
             */
        function () {
            return this._open;
        },
        set: function (open) {
            var previousOpen = this._open;
            this._open = open;
            if (previousOpen != this._open) {
                this.openChange.emit(this._open);
                if (this.isInitialized) {
                    this.setActionsVisibility();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmdFabSpeedDialComponent.prototype, "direction", {
        get: /**
             * The direction of the speed dial. Can be 'up', 'down', 'left' or 'right'
             */
        function () {
            return this._direction;
        },
        set: function (direction) {
            var previousDir = this._direction;
            this._direction = direction;
            if (previousDir != this.direction) {
                this._setElementClass(previousDir, false);
                this._setElementClass(this.direction, true);
                if (this.isInitialized) {
                    this.setActionsVisibility();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmdFabSpeedDialComponent.prototype, "animationMode", {
        get: /**
             * The animation mode to open the speed dial. Can be 'fling' or 'scale'
             */
        function () {
            return this._animationMode;
        },
        set: function (animationMode) {
            var _this = this;
            var previousAnimationMode = this._animationMode;
            this._animationMode = animationMode;
            if (previousAnimationMode != this._animationMode) {
                this._setElementClass(previousAnimationMode, false);
                this._setElementClass(this.animationMode, true);
                if (this.isInitialized) {
                    // To start another detect lifecycle and force the "close" on the action buttons
                    Promise.resolve(null).then(function () { return _this.open = false; });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SmdFabSpeedDialComponent.prototype.ngAfterContentInit = function () {
        this.isInitialized = true;
        this.setActionsVisibility();
        this._setElementClass(this.direction, true);
        this._setElementClass(this.animationMode, true);
    };
    /**
     * Toggle the open state of this speed dial
     */
    /**
         * Toggle the open state of this speed dial
         */
    SmdFabSpeedDialComponent.prototype.toggle = /**
         * Toggle the open state of this speed dial
         */
    function () {
        this.open = !this.open;
    };
    SmdFabSpeedDialComponent.prototype._onClick = function () {
        if (!this.fixed && this.open) {
            this.open = false;
        }
    };
    SmdFabSpeedDialComponent.prototype.setActionsVisibility = function () {
        if (this.open) {
            this._childActions.show();
        }
        else {
            this._childActions.hide();
        }
    };
    SmdFabSpeedDialComponent.prototype._setElementClass = function (elemClass, isAdd) {
        this.renderer.setElementClass(this.elementRef.nativeElement, "smd-" + elemClass, isAdd);
    };
    SmdFabSpeedDialComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'smd-fab-speed-dial',
                    template: "\n\t\t<div class=\"smd-fab-speed-dial-container\">\n\t\t\t<ng-content select=\"smd-fab-trigger\"></ng-content>\n\t\t\t<ng-content select=\"smd-fab-actions\"></ng-content>\n\t\t</div>\n\t",
                    styles: ["\n\t\tsmd-fab-speed-dial{display:inline-block}smd-fab-speed-dial.smd-opened .smd-fab-speed-dial-container smd-fab-trigger.smd-spin{-webkit-transform:rotate(360deg);transform:rotate(360deg)}smd-fab-speed-dial .smd-fab-speed-dial-container{position:relative;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;z-index:20}smd-fab-speed-dial .smd-fab-speed-dial-container smd-fab-trigger{pointer-events:auto;z-index:24}smd-fab-speed-dial .smd-fab-speed-dial-container smd-fab-trigger.smd-spin{-webkit-transition:all .6s cubic-bezier(.4,0,.2,1);transition:all .6s cubic-bezier(.4,0,.2,1)}smd-fab-speed-dial .smd-fab-speed-dial-container smd-fab-actions{display:-webkit-box;display:-webkit-flex;display:flex;height:auto}smd-fab-speed-dial.smd-fling .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{display:block;opacity:1;-webkit-transition:all .3s cubic-bezier(.55,0,.55,.2);transition:all .3s cubic-bezier(.55,0,.55,.2)}smd-fab-speed-dial.smd-scale .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{-webkit-transform:scale(0);transform:scale(0);-webkit-transition:all .3s cubic-bezier(.55,0,.55,.2);transition:all .3s cubic-bezier(.55,0,.55,.2);-webkit-transition-duration:.14286s;transition-duration:.14286s}smd-fab-speed-dial.smd-down .smd-fab-speed-dial-container{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}smd-fab-speed-dial.smd-down .smd-fab-speed-dial-container smd-fab-trigger{-webkit-box-ordinal-group:2;-webkit-order:1;order:1}smd-fab-speed-dial.smd-down .smd-fab-speed-dial-container smd-fab-actions{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-ordinal-group:3;-webkit-order:2;order:2}smd-fab-speed-dial.smd-down .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{margin-top:10px}smd-fab-speed-dial.smd-up .smd-fab-speed-dial-container{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}smd-fab-speed-dial.smd-up .smd-fab-speed-dial-container smd-fab-trigger{-webkit-box-ordinal-group:3;-webkit-order:2;order:2}smd-fab-speed-dial.smd-up .smd-fab-speed-dial-container smd-fab-actions{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}smd-fab-speed-dial.smd-up .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{margin-bottom:10px}smd-fab-speed-dial.smd-left .smd-fab-speed-dial-container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}smd-fab-speed-dial.smd-left .smd-fab-speed-dial-container smd-fab-trigger{-webkit-box-ordinal-group:3;-webkit-order:2;order:2}smd-fab-speed-dial.smd-left .smd-fab-speed-dial-container smd-fab-actions{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-ordinal-group:2;-webkit-order:1;order:1}smd-fab-speed-dial.smd-left .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{margin-right:10px}smd-fab-speed-dial.smd-right .smd-fab-speed-dial-container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}smd-fab-speed-dial.smd-right .smd-fab-speed-dial-container smd-fab-trigger{-webkit-box-ordinal-group:2;-webkit-order:1;order:1}smd-fab-speed-dial.smd-right .smd-fab-speed-dial-container smd-fab-actions{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-ordinal-group:3;-webkit-order:2;order:2}smd-fab-speed-dial.smd-right .smd-fab-speed-dial-container smd-fab-actions .smd-fab-action-item{margin-left:10px}\n\t"],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    SmdFabSpeedDialComponent.propDecorators = {
        "fixed": [{ type: core_1.Input },],
        "open": [{ type: core_1.HostBinding, args: ['class.smd-opened',] }, { type: core_1.Input },],
        "direction": [{ type: core_1.Input },],
        "animationMode": [{ type: core_1.Input },],
        "openChange": [{ type: core_1.Output },],
        "_childActions": [{ type: core_1.ContentChild, args: [SmdFabSpeedDialActions,] },],
        "_onClick": [{ type: core_1.HostListener, args: ['click',] },],
    };
    return SmdFabSpeedDialComponent;
}());
exports.SmdFabSpeedDialComponent = SmdFabSpeedDialComponent;
/** Speed dial module. */
var SmdFabSpeedDialModule = (function () {
    function SmdFabSpeedDialModule() {
    }
    SmdFabSpeedDialModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        SmdFabSpeedDialActions,
                        SmdFabSpeedDialComponent,
                        SmdFabSpeedDialTrigger
                    ],
                    exports: [
                        SmdFabSpeedDialActions,
                        SmdFabSpeedDialComponent,
                        SmdFabSpeedDialTrigger
                    ],
                    imports: [
                        button_1.MatButtonModule
                    ]
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialModule.ctorParameters = function () { return []; };
    return SmdFabSpeedDialModule;
}());
exports.SmdFabSpeedDialModule = SmdFabSpeedDialModule;
//# sourceMappingURL=smd-fab-speed-dial.js.map