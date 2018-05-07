import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, ViewController, AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-admin-contents',
  templateUrl: 'admin-contents.html',
})
export class AdminContentsPage {

  // private loader: boolean = false;

  constructor(private app: App, public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, public modalCntrl: ModalController, public events: Events, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }
  Modify(type) {
    if (type == "category") {

      this.navCtrl.push("MenuPage", {
        "fromAdmin": true
      })
      // this.modalCntrl.create("MenuPage", {
      //   "fromAdmin": true
      // }).present();
    } else if (type == "About") {
      this.navCtrl.push("AboutPage", {
        "type": 'Admin'
      });
    }
    else if (type == "Contact") {
      this.navCtrl.push("ContactPage", {
        "type": 'Admin'
      });
    }
    else if (type == "Quality") {
      this.navCtrl.push("QualityPage", {
        "type": 'Admin'
      });
    }
    else if (type == "Vision") {
      this.navCtrl.push("VisionPage", {
        "type": 'Admin'
      });
    } else if (type == 'City') {
      this.navCtrl.push("CitySetupPage", {
        "type": 'Admin'
      });
    }
  }
  logout() {

    firebase.auth().signOut().then(function () {

    }).catch(function (error) {
    });
    this.app.getRootNav().setRoot("TabsPage");
    let alert = this.alertCtrl.create({
      title: 'Log Out',
      subTitle: 'Please press ok to log out',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.app.getRootNav().setRoot("TabsPage");
          }
        }]
    });
    alert.present();


    // this.settonav();
    // this.viewCtrl.dismiss();


    // this.logout();
  }

  settonav() {
    let i = [1, 2];
    for (let data of i) {
      this.app.getRootNavById("TabsPage");
    }
  }
  addTaxes() {
    this.navCtrl.push("TaxPage", {
      "type": 'Admin'
    });
  }

  addShipingCharges() {
    this.navCtrl.push("ShipingChargesPage");
  }
  languagechange() {
    // this.storage.get("language").then(data => {
    //   if (data == '' || data == null) {
    this.modalCntrl.create('TestPage').present();
    //   }
    // })
  }
}
