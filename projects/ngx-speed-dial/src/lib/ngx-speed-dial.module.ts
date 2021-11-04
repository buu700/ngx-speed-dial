/* tslint:disable */

import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
	NgxSpeedDialActionsComponent,
	NgxSpeedDialComponent,
	NgxSpeedDialTriggerComponent
} from './ngx-speed-dial.component';

/** Speed dial module. */
@NgModule({
	declarations: [
		NgxSpeedDialActionsComponent,
		NgxSpeedDialComponent,
		NgxSpeedDialTriggerComponent
	],
	exports: [
		NgxSpeedDialActionsComponent,
		NgxSpeedDialComponent,
		NgxSpeedDialTriggerComponent
	],
	imports: [MatButtonModule]
})
export class NgxSpeedDialModule {}
