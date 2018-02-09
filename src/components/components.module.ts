import { NgModule } from '@angular/core';
import { RollResultComponent } from './roll-result/roll-result';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

@NgModule({
	declarations: [RollResultComponent],
	imports: [IonicModule],
	exports: [RollResultComponent]
})
export class ComponentsModule {}
