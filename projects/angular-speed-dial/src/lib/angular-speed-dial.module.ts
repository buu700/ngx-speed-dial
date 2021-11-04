/* tslint:disable */

import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
	SmdFabSpeedDialActions,
	SmdFabSpeedDialComponent,
	SmdFabSpeedDialTrigger
} from './angular-speed-dial.component';

/** Speed dial module. */
@NgModule({
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
	imports: [MatButtonModule]
})
export class SmdFabSpeedDialModule {}
