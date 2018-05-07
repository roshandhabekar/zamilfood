import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitySetupPage } from './city-setup';
import {PipesModule} from'../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CitySetupPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(CitySetupPage),
  ],
})
export class CitySetupPageModule {}
