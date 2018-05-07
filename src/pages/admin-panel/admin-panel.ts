import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminPanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-panel',
  template: ` 
    <ion-tabs selectedTabIndex="1">
      <ion-tab tabIcon="settings" tabTitle="Setups"  [root]="tab3"></ion-tab>
      <ion-tab tabIcon="cart" tabTitle="Orders" [root]="tab1"></ion-tab>
      <ion-tab tabIcon="card" tabTitle="Offers"  [root]="tab2"></ion-tab>
      <ion-tab tabIcon="mail" tabTitle="Mails"  [root]="tab4"></ion-tab>
    </ion-tabs>`,
})
export class AdminPanelPage {
  tab1 = "AdminOrdersPage";
  tab2 = "AdminPaymentsPage";
  tab3 = "AdminContentsPage";
  tab4 = "AdminEmailsPage";
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events) {
    this.event.subscribe("logout",(data)=>{
      this.navCtrl.setRoot("TabsPage");
    });
  }

  ionViewDidLoad() {

  }



}
