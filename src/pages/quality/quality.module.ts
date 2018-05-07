import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualityPage } from './quality';
import{DirectivesModule} from'../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    QualityPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(QualityPage),
    TranslateModule.forChild()
    
  ],
})
export class QualityPageModule {}
