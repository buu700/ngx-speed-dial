/* tslint:disable */

import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewEncapsulation,
	AfterContentInit,
	OnDestroy,
	ElementRef,
	Renderer2,
	ContentChildren,
	QueryList,
	ContentChild,
	HostBinding,
	HostListener,
	Injector
} from '@angular/core';
import {
	MatLegacyAnchor as MatAnchor,
	MatLegacyButton as MatButton
} from '@angular/material/legacy-button';
import {MatLegacyTooltip as MatTooltip} from '@angular/material/legacy-tooltip';
import {combineLatest} from 'rxjs';

const Z_INDEX_ITEM: number = 23;

@Component({
	selector: 'ngx-speed-dial-trigger',
	template: ` <ng-content select="[mat-fab]"></ng-content> `
})
export class NgxSpeedDialTriggerComponent {
	/**
	 * Whether this trigger should spin (360dg) while opening the speed dial
	 */
	@HostBinding('class.ngx-speed-dial-spin')
	@Input()
	spin: boolean = false;

	@ContentChildren(MatAnchor) _anchors?: QueryList<MatAnchor>;
	@ContentChildren(MatButton) _buttons?: QueryList<MatButton>;
	@ContentChildren(MatTooltip) _tooltips?: QueryList<MatTooltip>;

	isOpen = false;
	tooltipEventsSet = false;

	private readonly _parent: NgxSpeedDialComponent;

	constructor (injector: Injector) {
		this._parent = injector.get(NgxSpeedDialComponent);
	}

	@HostListener('click', ['$event'])
	_onClick (event: any) {
		if (!this._parent.fixed && !this._parent.forceTooltips) {
			this._parent.toggle();
			event.stopPropagation();
		}
	}

	getAllButtons () {
		return [
			...(this._anchors ? this._anchors.toArray() : []),
			...(this._buttons ? this._buttons.toArray() : [])
		];
	}

	showTooltips () {
		if (this._parent.forceTooltips && this.isOpen && this._tooltips) {
			this._tooltips.forEach((tooltip, i) => {
				tooltip.hide();

				for (let n = i * 65 + 3; n <= 1500; n += 150) {
					setTimeout(() => {
						if (
							this._parent.forceTooltips &&
							this.isOpen &&
							!tooltip._isTooltipVisible()
						) {
							tooltip.show();
						}
					}, n);
				}
			});
		}
	}

	show () {
		this.isOpen = true;

		if (this._parent.forceTooltips && !this.tooltipEventsSet) {
			this.tooltipEventsSet = true;

			this.getAllButtons().forEach(button => {
				(<HTMLElement> button._getHostElement()).addEventListener(
					'mouseleave',
					() => {
						this.showTooltips();
					}
				);
			});
		}

		this.showTooltips();
	}

	hide () {
		this.isOpen = false;

		if (this._parent.forceTooltips && this._tooltips) {
			this._tooltips.forEach(tooltip => {
				tooltip.hide();
			});
		}
	}
}

@Component({
	selector: 'ngx-speed-dial-actions',
	template: ` <ng-content select="[mat-mini-fab]"></ng-content> `
})
export class NgxSpeedDialActionsComponent implements AfterContentInit {
	@ContentChildren(MatAnchor) _anchors?: QueryList<MatAnchor>;
	@ContentChildren(MatButton) _buttons?: QueryList<MatButton>;
	@ContentChildren(MatTooltip) _tooltips?: QueryList<MatTooltip>;

	isOpen = false;
	tooltipEventsSet = false;

	private readonly _parent: NgxSpeedDialComponent;

	constructor (
		injector: Injector,
		private renderer: Renderer2
	) {
		this._parent = injector.get(NgxSpeedDialComponent);
	}

	getAllButtons () {
		return [
			...(this._anchors ? this._anchors.toArray() : []),
			...(this._buttons ? this._buttons.toArray() : [])
		];
	}

	ngAfterContentInit () : void {
		if (!this._anchors || !this._buttons) {
			return;
		}

		combineLatest([this._anchors.changes, this._buttons.changes]).subscribe(
			() => {
				this.initButtonStates();
				this._parent.setActionsVisibility();
			}
		);

		this.initButtonStates();
	}

	private initButtonStates () {
		this.getAllButtons().forEach((button, i) => {
			this.renderer.addClass(button._getHostElement(), 'ngx-action-item');
			this.changeElementStyle(
				button._getHostElement(),
				'z-index',
				'' + (Z_INDEX_ITEM - i)
			);
		});
	}

	showTooltips () {
		if (this._parent.forceTooltips && this.isOpen && this._tooltips) {
			this._tooltips.forEach((tooltip, i) => {
				tooltip.hide();

				for (let n = i * 65 + 3; n <= 1500; n += 150) {
					setTimeout(() => {
						if (
							this._parent.forceTooltips &&
							this.isOpen &&
							!tooltip._isTooltipVisible()
						) {
							tooltip.show();
						}
					}, n);
				}
			});
		}
	}

	show () {
		this.isOpen = true;

		this.getAllButtons().forEach((button, i) => {
			let transitionDelay = 0;
			let transform;
			if (this._parent.animationMode == 'scale') {
				// Incremental transition delay of 65ms for each action button
				transitionDelay = 3 + 65 * i;
				transform = 'scale(1)';
			}
			else {
				transform = this.getTranslateFunction('0');
			}
			this.changeElementStyle(
				button._getHostElement(),
				'transition-delay',
				transitionDelay + 'ms'
			);
			this.changeElementStyle(button._getHostElement(), 'opacity', '1');
			this.changeElementStyle(
				button._getHostElement(),
				'transform',
				transform
			);

			if (this._parent.forceTooltips && !this.tooltipEventsSet) {
				(<HTMLElement> button._getHostElement()).addEventListener(
					'mouseleave',
					() => {
						this.showTooltips();
					}
				);
			}
		});

		if (this._parent.forceTooltips) {
			this.tooltipEventsSet = true;
		}

		this.showTooltips();
	}

	hide () {
		this.isOpen = false;

		this.getAllButtons().forEach((button, i) => {
			let opacity = '1';
			let transitionDelay = 0;
			let transform;
			if (this._parent.animationMode == 'scale') {
				transitionDelay = 3 - 65 * i;
				transform = 'scale(0)';
				opacity = '0';
			}
			else {
				transform = this.getTranslateFunction(
					55 * (i + 1) - i * 5 + 'px'
				);
			}
			this.changeElementStyle(
				button._getHostElement(),
				'transition-delay',
				transitionDelay + 'ms'
			);
			this.changeElementStyle(
				button._getHostElement(),
				'opacity',
				opacity
			);
			this.changeElementStyle(
				button._getHostElement(),
				'transform',
				transform
			);
		});

		if (this._parent.forceTooltips && this._tooltips) {
			this._tooltips.forEach(tooltip => {
				tooltip.hide();
			});
		}
	}

	private getTranslateFunction (value: string) {
		let dir = this._parent.direction;
		let translateFn =
			dir == 'up' || dir == 'down' ? 'translateY' : 'translateX';
		let sign = dir == 'down' || dir == 'right' ? '-' : '';
		return translateFn + '(' + sign + value + ')';
	}

	private changeElementStyle (elem: any, style: string, value: string) {
		// FIXME - Find a way to create a "wrapper" around the action button(s) provided by the user, so we don't change it's style tag
		if (value) {
			this.renderer.setStyle(elem, style, value);
		}
		else {
			this.renderer.removeStyle(elem, style);
		}
	}
}

@Component({
	selector: 'ngx-speed-dial',
	template: `
		<div class="ngx-speed-dial-container">
			<ng-content select="ngx-speed-dial-trigger"></ng-content>
			<ng-content select="ngx-speed-dial-actions"></ng-content>
		</div>
	`,
	styles: [
		`
			ngx-speed-dial {
				display: inline-block;
			}
			ngx-speed-dial.ngx-speed-dial-opened
				.ngx-speed-dial-container
				ngx-speed-dial-trigger.ngx-speed-dial-spin {
				-webkit-transform: rotate(360deg);
				transform: rotate(360deg);
			}
			ngx-speed-dial .ngx-speed-dial-container {
				position: relative;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				-webkit-box-align: center;
				-webkit-align-items: center;
				align-items: center;
				z-index: 20;
			}
			ngx-speed-dial .ngx-speed-dial-container ngx-speed-dial-trigger {
				pointer-events: auto;
				z-index: 24;
			}
			ngx-speed-dial
				.ngx-speed-dial-container
				ngx-speed-dial-trigger.ngx-speed-dial-spin {
				-webkit-transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
				transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
			}
			ngx-speed-dial .ngx-speed-dial-container ngx-speed-dial-actions {
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				height: auto;
			}
			ngx-speed-dial.ngx-speed-dial-fling
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				display: block;
				opacity: 1;
				-webkit-transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
				transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
			}
			ngx-speed-dial.ngx-speed-dial-scale
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				-webkit-transform: scale(0);
				transform: scale(0);
				-webkit-transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
				transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
				-webkit-transition-duration: 0.14286s;
				transition-duration: 0.14286s;
			}
			ngx-speed-dial.ngx-speed-dial-down .ngx-speed-dial-container {
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				flex-direction: column;
			}
			ngx-speed-dial.ngx-speed-dial-down
				.ngx-speed-dial-container
				ngx-speed-dial-trigger {
				-webkit-box-ordinal-group: 2;
				-webkit-order: 1;
				order: 1;
			}
			ngx-speed-dial.ngx-speed-dial-down
				.ngx-speed-dial-container
				ngx-speed-dial-actions {
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				flex-direction: column;
				-webkit-box-ordinal-group: 3;
				-webkit-order: 2;
				order: 2;
			}
			ngx-speed-dial.ngx-speed-dial-down
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				margin-top: 10px;
			}
			ngx-speed-dial.ngx-speed-dial-up .ngx-speed-dial-container {
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				flex-direction: column;
			}
			ngx-speed-dial.ngx-speed-dial-up
				.ngx-speed-dial-container
				ngx-speed-dial-trigger {
				-webkit-box-ordinal-group: 3;
				-webkit-order: 2;
				order: 2;
			}
			ngx-speed-dial.ngx-speed-dial-up
				.ngx-speed-dial-container
				ngx-speed-dial-actions {
				-webkit-box-orient: vertical;
				-webkit-box-direction: reverse;
				-webkit-flex-direction: column-reverse;
				flex-direction: column-reverse;
				-webkit-box-ordinal-group: 2;
				-webkit-order: 1;
				order: 1;
			}
			ngx-speed-dial.ngx-speed-dial-up
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				margin-bottom: 10px;
			}
			ngx-speed-dial.ngx-speed-dial-left .ngx-speed-dial-container {
				-webkit-box-orient: horizontal;
				-webkit-box-direction: normal;
				-webkit-flex-direction: row;
				flex-direction: row;
			}
			ngx-speed-dial.ngx-speed-dial-left
				.ngx-speed-dial-container
				ngx-speed-dial-trigger {
				-webkit-box-ordinal-group: 3;
				-webkit-order: 2;
				order: 2;
			}
			ngx-speed-dial.ngx-speed-dial-left
				.ngx-speed-dial-container
				ngx-speed-dial-actions {
				-webkit-box-orient: horizontal;
				-webkit-box-direction: normal;
				-webkit-flex-direction: row-reverse;
				flex-direction: row-reverse;
				-webkit-box-ordinal-group: 2;
				-webkit-order: 1;
				order: 1;
			}
			ngx-speed-dial.ngx-speed-dial-left
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				margin-right: 10px;
			}
			ngx-speed-dial.ngx-speed-dial-right .ngx-speed-dial-container {
				-webkit-box-orient: horizontal;
				-webkit-box-direction: normal;
				-webkit-flex-direction: row;
				flex-direction: row;
			}
			ngx-speed-dial.ngx-speed-dial-right
				.ngx-speed-dial-container
				ngx-speed-dial-trigger {
				-webkit-box-ordinal-group: 2;
				-webkit-order: 1;
				order: 1;
			}
			ngx-speed-dial.ngx-speed-dial-right
				.ngx-speed-dial-container
				ngx-speed-dial-actions {
				-webkit-box-orient: horizontal;
				-webkit-box-direction: normal;
				-webkit-flex-direction: row;
				flex-direction: row;
				-webkit-box-ordinal-group: 3;
				-webkit-order: 2;
				order: 2;
			}
			ngx-speed-dial.ngx-speed-dial-right
				.ngx-speed-dial-container
				ngx-speed-dial-actions
				.ngx-action-item {
				margin-left: 10px;
			}
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class NgxSpeedDialComponent implements AfterContentInit, OnDestroy {
	private isInitialized: boolean = false;
	private _direction: string = 'up';
	private _open: boolean = false;
	private _animationMode: string = 'fling';

	/**
	 * Whether this speed dial is fixed on screen (user cannot change it by clicking)
	 */
	@Input() fixed: boolean = false;

	/**
	 * Whether this all tooltips should be forced open
	 */
	@Input() forceTooltips: boolean = false;

	/**
	 * Whether this speed dial is opened
	 */
	@HostBinding('class.ngx-speed-dial-opened')
	@Input()
	get open () {
		return this._open;
	}

	set open (open: boolean) {
		let previousOpen = this._open;
		this._open = open;
		if (previousOpen != this._open) {
			this.openChange.emit(this._open);
			if (this.isInitialized) {
				this.setActionsVisibility();
			}
		}
	}

	/**
	 * The direction of the speed dial. Can be 'up', 'down', 'left' or 'right'
	 */
	@Input() get direction () {
		return this._direction;
	}

	set direction (direction: string) {
		let previousDir = this._direction;
		this._direction = direction;
		if (previousDir != this.direction) {
			this._setElementClass(previousDir, false);
			this._setElementClass(this.direction, true);

			if (this.isInitialized) {
				this.setActionsVisibility();
			}
		}
	}

	/**
	 * The animation mode to open the speed dial. Can be 'fling' or 'scale'
	 */
	@Input() get animationMode () {
		return this._animationMode;
	}

	set animationMode (animationMode: string) {
		let previousAnimationMode = this._animationMode;
		this._animationMode = animationMode;
		if (previousAnimationMode != this._animationMode) {
			this._setElementClass(previousAnimationMode, false);
			this._setElementClass(this.animationMode, true);

			if (this.isInitialized) {
				// To start another detect lifecycle and force the "close" on the action buttons
				Promise.resolve(null).then(() => (this.open = false));
			}
		}
	}

	@Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	@ContentChild(NgxSpeedDialActionsComponent)
	_childActions?: NgxSpeedDialActionsComponent;
	@ContentChild(NgxSpeedDialTriggerComponent)
	_childTrigger?: NgxSpeedDialTriggerComponent;

	constructor (
		private elementRef: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterContentInit () : void {
		this.isInitialized = true;
		this.setActionsVisibility();
		this._setElementClass(this.direction, true);
		this._setElementClass(this.animationMode, true);
	}

	ngOnDestroy () : void {
		this.forceTooltips = false;
	}

	/**
	 * Toggle the open state of this speed dial
	 */
	public toggle () {
		this.open = !this.open;
	}

	@HostListener('click')
	_onClick () {
		if (!this.fixed && !this.forceTooltips && this.open) {
			this.open = false;
		}
	}

	setActionsVisibility () {
		if (this.open) {
			this._childTrigger?.show();
			this._childActions?.show();
		}
		else {
			this._childTrigger?.hide();
			this._childActions?.hide();
		}
	}

	private _setElementClass (elemClass: string, isAdd: boolean) {
		if (isAdd) {
			this.renderer.addClass(
				this.elementRef.nativeElement,
				`ngx-speed-dial-${elemClass}`
			);
		}
		else {
			this.renderer.removeClass(
				this.elementRef.nativeElement,
				`ngx-speed-dial-${elemClass}`
			);
		}
	}
}
