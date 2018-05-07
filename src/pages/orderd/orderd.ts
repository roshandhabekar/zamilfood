import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import *as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../config/appsettings';
// import { elementDef } from '@angular/core/src/view/element';

@IonicPage()
@Component({
  selector: 'page-orderd',
  templateUrl: 'orderd.html',
})
export class OrdersPage {
  public userID: String = "";
  items: any;
  private loader: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCntrl: ModalController) {
    this.storage.get("userID").then(data => {
      this.userID = data;
      let orderRef = firebase.database().ref("/Order/" + APP_CONFIG.UID + "/" + this.userID + "/");
      orderRef.on("value", (snapshot) => {
        if (snapshot.val() != null) {
          this.items = snapshot.val();
          for (let data in this.items) {
            for (let key in this.items[data]["OrderDetails"]) {
              let itemrefrence = firebase.database().ref("/FoodList/" + this.items[data]["OrderDetails"][key]['Categories'] + "/" + this.items[data]["OrderDetails"][key]['ItemID']);
              itemrefrence.on("value", (snapshot2) => {
                if (snapshot2.val() != null) {
                  this.items[data]['imgPath'] = snapshot2.val()['ImagePath'];
                  // this.items[data]['itemName'] = snapshot2.val()['Name'];
                  this.items[data]['Description'] = snapshot2.val()['Description'];
                  this.items[data]["OrderDetails"][key]['imgPath'] = snapshot2.val()['ImagePath'];
                  this.items[data]['OrderDetails'][key]['Name'] = snapshot2.val()['Name'];
                  this.items[data]['OrderDetails'][key]['Description'] = snapshot2.val()['Description'];
                  this.loader =false;
                }else{
                  this.loader =false;
                }
              })
            }
          }
        }
        else{
          this.loader =false;
        }
      });
    });
  }
  ionViewDidLoad() {
  }
  veiwOrderUser(item) {
    this.modalCntrl.create("UserOrderViewPage", {
      "itemData": this.items[item]
    }).present();
  }
}
