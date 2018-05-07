import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';

import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
    TranslateModule.forChild()
  ],
})
export class TestPageModule {}
