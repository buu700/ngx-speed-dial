"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var tooltip_1 = require("@angular/material/tooltip");
var rxjs_1 = require("rxjs");
var Z_INDEX_ITEM = 23;
var SmdFabSpeedDialTrigger = /** @class */ (function () {
    function SmdFabSpeedDialTrigger(injector) {
        /**
         * Whether this trigger should spin (360dg) while opening the speed dial
         */
        this.spin = false;
        this.isOpen = false;
        this.tooltipEventsSet = false;
        this._parent = injector.get(SmdFabSpeedDialComponent);
    }
    SmdFabSpeedDialTrigger.prototype._onClick = function (event) {
        if (!this._parent.fixed && !this._parent.forceTooltips) {
            this._parent.toggle();
            event.stopPropagation();
        }
    };
    SmdFabSpeedDialTrigger.prototype.getAllButtons = function () {
        return (this._anchors ? this._anchors.toArray() : []).concat((this._buttons ? this._buttons.toArray() : []));
    };
    SmdFabSpeedDialTrigger.prototype.showTooltips = function () {
        var _this = this;
        if (this._parent.forceTooltips && this.isOpen && this._tooltips) {
            this._tooltips.forEach(function (tooltip, i) {
                tooltip.hide();
                for (var n = i * 65 + 3; n <= 1500; n += 150) {
                    setTimeout(function () {
                        if (_this.isOpen && !tooltip._isTooltipVisible()) {
                            tooltip.show();
                        }
                    }, n);
                }
            });
        }
    };
    SmdFabSpeedDialTrigger.prototype.show = function () {
        var _this = this;
        this.isOpen = true;
        if (this._parent.forceTooltips && !this.tooltipEventsSet) {
            this.tooltipEventsSet = true;
            this.getAllButtons().forEach(function (button) {
                button._getHostElement().addEventListener('mouseleave', function () {
                    _this.showTooltips();
                });
            });
        }
        this.showTooltips();
    };
    SmdFabSpeedDialTrigger.prototype.hide = function () {
        this.isOpen = false;
        if (this._parent.forceTooltips && this._tooltips) {
            this._tooltips.forEach(function (tooltip) {
                tooltip.hide();
            });
        }
    };
    SmdFabSpeedDialTrigger.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'smd-fab-trigger',
                    template: "\n\t\t<ng-content select=\"[mat-fab]\"></ng-content>\n\t"
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialTrigger.ctorParameters = function () { return [
        { type: core_1.Injector }
    ]; };
    SmdFabSpeedDialTrigger.propDecorators = {
        spin: [{ type: core_1.HostBinding, args: ['class.smd-spin',] }, { type: core_1.Input }],
        _anchors: [{ type: core_1.ContentChildren, args: [button_1.MatAnchor,] }],
        _buttons: [{ type: core_1.ContentChildren, args: [button_1.MatButton,] }],
        _tooltips: [{ type: core_1.ContentChildren, args: [tooltip_1.MatTooltip,] }],
        _onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }]
    };
    return SmdFabSpeedDialTrigger;
}());
exports.SmdFabSpeedDialTrigger = SmdFabSpeedDialTrigger;
var SmdFabSpeedDialActions = /** @class */ (function () {
    function SmdFabSpeedDialActions(injector, renderer) {
        this.renderer = renderer;
        this.isOpen = false;
        this.tooltipEventsSet = false;
        this._parent = injector.get(SmdFabSpeedDialComponent);
    }
    SmdFabSpeedDialActions.prototype.getAllButtons = function () {
        return (this._anchors ? this._anchors.toArray() : []).concat((this._buttons ? this._buttons.toArray() : []));
    };
    SmdFabSpeedDialActions.prototype.ngAfterContentInit = function () {
        var _this = this;
        rxjs_1.combineLatest(this._anchors.changes, this._buttons.changes).subscribe(function () {
            _this.initButtonStates();
            _this._parent.setActionsVisibility();
        });
        this.initButtonStates();
    };
    SmdFabSpeedDialActions.prototype.initButtonStates = function () {
        var _this = this;
        this.getAllButtons().forEach(function (button, i) {
            _this.renderer.setElementClass(button._getHostElement(), 'smd-fab-action-item', true);
            _this.changeElementStyle(button._getHostElement(), 'z-index', '' + (Z_INDEX_ITEM - i));
        });
    };
    SmdFabSpeedDialActions.prototype.showTooltips = function () {
        var _this = this;
        if (this._parent.forceTooltips && this.isOpen && this._tooltips) {
            this._tooltips.forEach(function (tooltip, i) {
                tooltip.hide();
                for (var n = i * 65 + 3; n <= 1500; n += 150) {
                    setTimeout(function () {
                        if (_this.isOpen && !tooltip._isTooltipVisible()) {
                            tooltip.show();
                        }
                    }, n);
                }
            });
        }
    };
    SmdFabSpeedDialActions.prototype.show = function () {
        var _this = this;
        this.isOpen = true;
        this.getAllButtons().forEach(function (button, i) {
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
            if (_this._parent.forceTooltips && !_this.tooltipEventsSet) {
                button._getHostElement().addEventListener('mouseleave', function () {
                    _this.showTooltips();
                });
            }
        });
        if (this._parent.forceTooltips) {
            this.tooltipEventsSet = true;
        }
        this.showTooltips();
    };
    SmdFabSpeedDialActions.prototype.hide = function () {
        var _this = this;
        this.isOpen = false;
        this.getAllButtons().forEach(function (button, i) {
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
        if (this._parent.forceTooltips && this._tooltips) {
            this._tooltips.forEach(function (tooltip) {
                tooltip.hide();
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
                    template: "\n\t\t<ng-content select=\"[mat-mini-fab]\"></ng-content>\n\t"
                },] },
    ];
    /** @nocollapse */
    SmdFabSpeedDialActions.ctorParameters = function () { return [
        { type: core_1.Injector },
        { type: core_1.Renderer }
    ]; };
    SmdFabSpeedDialActions.propDecorators = {
        _anchors: [{ type: core_1.ContentChildren, args: [button_1.MatAnchor,] }],
        _buttons: [{ type: core_1.ContentChildren, args: [button_1.MatButton,] }],
        _tooltips: [{ type: core_1.ContentChildren, args: [tooltip_1.MatTooltip,] }]
    };
    return SmdFabSpeedDialActions;
}());
exports.SmdFabSpeedDialActions = SmdFabSpeedDialActions;
var SmdFabSpeedDialComponent = /** @class */ (function () {
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
        /**
         * Whether this all tooltips should be forced open
         */
        this.forceTooltips = false;
        this.openChange = new core_1.EventEmitter();
    }
    Object.defineProperty(SmdFabSpeedDialComponent.prototype, "open", {
        /**
         * Whether this speed dial is opened
         */
        get: function () {
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
        /**
         * The direction of the speed dial. Can be 'up', 'down', 'left' or 'right'
         */
        get: function () {
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
        /**
         * The animation mode to open the speed dial. Can be 'fling' or 'scale'
         */
        get: function () {
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
    SmdFabSpeedDialComponent.prototype.ngOnDestroy = function () {
        this.forceTooltips = false;
    };
    /**
     * Toggle the open state of this speed dial
     */
    SmdFabSpeedDialComponent.prototype.toggle = function () {
        this.open = !this.open;
    };
    SmdFabSpeedDialComponent.prototype._onClick = function () {
        if (!this.fixed && !this.forceTooltips && this.open) {
            this.open = false;
        }
    };
    SmdFabSpeedDialComponent.prototype.setActionsVisibility = function () {
        if (this.open) {
            this._childTrigger.show();
            this._childActions.show();
        }
        else {
            this._childTrigger.hide();
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
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    SmdFabSpeedDialComponent.propDecorators = {
        fixed: [{ type: core_1.Input }],
        forceTooltips: [{ type: core_1.Input }],
        open: [{ type: core_1.HostBinding, args: ['class.smd-opened',] }, { type: core_1.Input }],
        direction: [{ type: core_1.Input }],
        animationMode: [{ type: core_1.Input }],
        openChange: [{ type: core_1.Output }],
        _childActions: [{ type: core_1.ContentChild, args: [SmdFabSpeedDialActions,] }],
        _childTrigger: [{ type: core_1.ContentChild, args: [SmdFabSpeedDialTrigger,] }],
        _onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return SmdFabSpeedDialComponent;
}());
exports.SmdFabSpeedDialComponent = SmdFabSpeedDialComponent;
/** Speed dial module. */
var SmdFabSpeedDialModule = /** @class */ (function () {
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
    return SmdFabSpeedDialModule;
}());
exports.SmdFabSpeedDialModule = SmdFabSpeedDialModule;
//# sourceMappingURL=smd-fab-speed-dial.js.map