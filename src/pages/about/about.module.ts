import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(AboutPage),
    TranslateModule.forChild()
  ],
})
export class AboutPageModule { }
