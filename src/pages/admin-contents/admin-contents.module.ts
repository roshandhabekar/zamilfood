import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminContentsPage } from './admin-contents';
import { ComponentsModule } from '../../components/components.module';
//import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AdminContentsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdminContentsPage)
   // TranslateModule.forChild()
  ],
})
export class AdminContentsPageModule {}
