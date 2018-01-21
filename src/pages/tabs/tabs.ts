import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs', 
  template: `
  <ion-tabs tabsHideOnSubPages="true">
    <ion-tab tabIcon="list" tabTitle="Menu" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="cart" tabTitle="Cart"  tabBadge="2" [root]="tab2"></ion-tab>
    <ion-tab tabIcon="clipboard" tabTitle="Orders" [root]="tab3"></ion-tab>
    <ion-tab tabIcon="settings" tabTitle="Setup"  [root]="tab4"></ion-tab>
  </ion-tabs>`
})
export class TabsPage {
  tab1 = "MenuPage";
  tab2 = "CartPage";
  tab3 = "OrdersPage";
  tab4 = "SettingsPage";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
