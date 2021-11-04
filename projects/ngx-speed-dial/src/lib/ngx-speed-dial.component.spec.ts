import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxSpeedDialComponent} from './ngx-speed-dial.component';

describe('AngularSpeedDialComponent', () => {
	let component: NgxSpeedDialComponent;
	let fixture: ComponentFixture<NgxSpeedDialComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NgxSpeedDialComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxSpeedDialComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
