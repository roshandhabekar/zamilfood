import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrdersPage } from './admin-orders';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
//import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminOrdersPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminOrdersPage)
    //  TranslateModule.forChild()
  ],
})
export class AdminOrdersPageModule {}
