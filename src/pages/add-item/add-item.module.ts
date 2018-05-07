import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemPage } from './add-item';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddItemPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddItemPage),
    TranslateModule.forChild()
    
  ],
})
export class AddItemPageModule {}
