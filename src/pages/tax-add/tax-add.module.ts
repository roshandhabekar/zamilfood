import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxAddPage } from './tax-add';

@NgModule({
  declarations: [
    TaxAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxAddPage),
  ],
})
export class TaxAddPageModule {}
