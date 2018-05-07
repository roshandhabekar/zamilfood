import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisionPage } from './vision';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    VisionPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(VisionPage),
    TranslateModule.forChild()
  ],
})
export class VisionPageModule {}
