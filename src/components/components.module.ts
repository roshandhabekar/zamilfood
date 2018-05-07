import { NgModule } from '@angular/core';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [CustomSpinnerComponent],
	imports: [IonicModule],
	exports: [CustomSpinnerComponent]
})
export class ComponentsModule {}
