import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddOfferPage } from './admin-add-offer';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdminAddOfferPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AdminAddOfferPage),
  ],
})
export class AdminAddOfferPageModule {}
