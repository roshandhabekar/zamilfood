import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';
import { PipesModule } from '../../pipes/pipes.module';
import {ComponentsModule} from'../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(MenuPage),
    TranslateModule.forChild()
    
  ],
})
export class MenuPageModule { }
