/* tslint:disable */
import { Component, NgModule, Input, Output, EventEmitter, ViewEncapsulation, AfterContentInit, ElementRef, Renderer, ContentChildren, QueryList, ContentChild, HostBinding, HostListener, Injector } from "@angular/core";
import { MatButton, MatButtonModule } from "@angular/material";
var Z_INDEX_ITEM = 23;
var SmdFabSpeedDialTrigger = /** @class */ (function () {
    function SmdFabSpeedDialTrigger(injector) {
        this._parent = injector.get(SmdFabSpeedDialComponent);
    }
    SmdFabSpeedDialTrigger.prototype._onClick = function (event) {
        if (!this._parent.fixed) {
            this._parent.toggle();
            event.stopPropagation();
        }
    };
    return SmdFabSpeedDialTrigger;
}());
export { SmdFabSpeedDialTrigger };
var SmdFabSpeedDialActions = /** @class */ (function () {
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
    return SmdFabSpeedDialActions;
}());
export { SmdFabSpeedDialActions };
var SmdFabSpeedDialComponent = /** @class */ (function () {
    function SmdFabSpeedDialComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
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
    return SmdFabSpeedDialComponent;
}());
export { SmdFabSpeedDialComponent };
/** Speed dial module. */
var /** Speed dial module. */
SmdFabSpeedDialModule = /** @class */ (function () {
    function SmdFabSpeedDialModule() {
    }
    return SmdFabSpeedDialModule;
}());
/** Speed dial module. */
export { SmdFabSpeedDialModule };
//# sourceMappingURL=smd-fab-speed-dial.js.map