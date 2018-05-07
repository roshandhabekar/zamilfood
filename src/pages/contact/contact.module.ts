import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
