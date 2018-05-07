import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPanelPage } from './admin-panel';
//import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPanelPage)    
  ],
})
export class AdminPanelPageModule {}
