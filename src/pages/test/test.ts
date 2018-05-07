import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  bar = { "test": 'bar' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService,private viewCntrl:ViewController, public storage: Storage) {
    //this.translateService.setDefaultLang('en');
    //this.translateService.use('hr');
  }

  ionViewDidLoad() {
    
  }
  segmentChanged(event) {
    
    this.storage.set('language', event._value).then(data=>{
    })
    
    this.translateService.use(event._value);
    this.translateService.setDefaultLang(event._value);
   // this.translateService.use(event._value); 
    this.viewCntrl.dismiss().then(()=>{
      this.navCtrl.setRoot("TabsPage");
    })
  }
  dismiss(){
    this.viewCntrl.dismiss().then(()=>{
      this.navCtrl.setRoot("TabsPage");
    })
  }
}
