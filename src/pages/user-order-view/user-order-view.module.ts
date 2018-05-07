import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserOrderViewPage } from './user-order-view';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UserOrderViewPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserOrderViewPage),
    TranslateModule.forChild()
  ],
})
export class UserOrderViewPageModule {}
