import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SmdFabSpeedDialComponent} from './angular-speed-dial.component';

describe('AngularSpeedDialComponent', () => {
	let component: SmdFabSpeedDialComponent;
	let fixture: ComponentFixture<SmdFabSpeedDialComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmdFabSpeedDialComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SmdFabSpeedDialComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
