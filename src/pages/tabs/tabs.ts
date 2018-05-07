import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Tabs } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import *as firebase from 'firebase';
import {FirebaseServiceProvider} from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  template: `
 <ion-tabs #myTabs preloadTabs="false">
   <ion-tab tabIcon="home" tabTitle="{{ 'Home' | translate }}"  [root]="tab4"></ion-tab>
   <ion-tab tabIcon="list" tabTitle="{{ 'Menu' | translate }}" [enabled]="FirebaseService.states" [root]="tab1"></ion-tab>
   <ion-tab tabIcon="cart" tabTitle="{{ 'Cart' | translate }}" [enabled]="FirebaseService.states"  [tabBadge]="countinCart > 0 ? countinCart : null" [root]="tab2"></ion-tab>
   <ion-tab tabIcon="clipboard" tabTitle="{{ 'Ordered' | translate }}" [enabled]="FirebaseService.states" [root]="tab3"></ion-tab>

 </ion-tabs>`
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1 = "MenuPage";
  tab2 = "CartPage";
  tab3 = "OrdersPage";
  tab4 = "OffersPage";
  private countinCart = 0;

  constructor(private FirebaseService:FirebaseServiceProvider, private event: Events, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('userID').then((userID) => {
      if (userID != null) {
        let oredrRef = firebase.database().ref("/Cart" + '/' + userID);
        oredrRef.on("value", (snapshot) => {
          this.countinCart = 0;
          if (snapshot.val() != null) {
            let count = Object.keys(snapshot.val());
            this.countinCart = count.length;
          }
        });
      }
    });
    this.event.subscribe('addedcart', (id) => {
      let oredrRef = firebase.database().ref("/Cart" + '/' + id);
      oredrRef.on("value", (snapshot) => {
        this.countinCart = 0;
        if (snapshot.val() != null) {
          var count = Object.keys(snapshot.val());
          this.countinCart = count.length;
        }
      });
    });
  }

  ionViewDidLoad() {

  }

}
