import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupPage } from './setup';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SetupPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SetupPage),
    TranslateModule.forChild()
    
  ],
})
export class SetupPageModule {}
