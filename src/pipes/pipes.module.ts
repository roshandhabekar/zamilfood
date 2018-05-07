import { NgModule } from '@angular/core';
import { GetkeyPipe } from './getkey/getkey';
import { FilterCityPipe } from './filter-city/filter-city';
import { ReversePipe } from './reverse/reverse';
@NgModule({
	declarations: [GetkeyPipe,
    FilterCityPipe,
    ReversePipe],
	imports: [],
	exports: [GetkeyPipe,
    FilterCityPipe,
    ReversePipe]
})
export class PipesModule {}
