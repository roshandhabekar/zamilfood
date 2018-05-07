import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxPage } from './tax';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    TaxPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(TaxPage),
  ],
})
export class TaxPageModule {}
