import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-order-view',
  templateUrl: 'user-order-view.html',
})
export class UserOrderViewPage {
  item: any;
  itemList: any;
  private default_language = '';
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private viewCntrl: ViewController) {
    this.item = this.navParams.get("itemData");
    this.itemList = this.item['OrderDetails'];
  }

  ionViewDidLoad() {
 
    this.storage.get('language').then((language) => {
      if (language != null) {
        this.default_language = language;
      }
      else {
        this.default_language = 'hr';
      }
    });
  }
  dismiss() {
    this.viewCntrl.dismiss();
  }

}
