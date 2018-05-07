import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header/parallax-header';
import { AutosizeDirective } from './autosize/autosize';
@NgModule({
	declarations: [ParallaxHeaderDirective,
    ParallaxHeaderDirective,
    AutosizeDirective],
	imports: [],
	exports: [ParallaxHeaderDirective,
    ParallaxHeaderDirective,
    AutosizeDirective]
})
export class DirectivesModule {}
