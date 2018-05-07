import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPaymentsPage } from './admin-payments';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminPaymentsPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(AdminPaymentsPage),
    TranslateModule.forChild()
    
  ],
})
export class AdminPaymentsPageModule {}
