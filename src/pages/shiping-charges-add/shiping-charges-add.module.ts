import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipingChargesAddPage } from './shiping-charges-add';
import {PipesModule} from'../../pipes/pipes.module';
@NgModule({
  declarations: [
    ShipingChargesAddPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ShipingChargesAddPage),
  ],
})
export class ShipingChargesAddPageModule {}
