import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodDetailPage } from './food-detail';
import { ComponentsModule } from '../../components/components.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FoodDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FoodDetailPage),
    TranslateModule.forChild()
  ],
})
export class FoodDetailPageModule {}
