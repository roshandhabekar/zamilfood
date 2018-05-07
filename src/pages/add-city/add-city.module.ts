import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCityPage } from './add-city';

@NgModule({
  declarations: [
    AddCityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCityPage),
  ],
})
export class AddCityPageModule {}
