import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import *as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../config/appsettings';
@IonicPage()
@Component({
  selector: 'page-admin-order-view',
  templateUrl: 'admin-order-view.html',
})
export class AdminOrderViewPage {
  item: any;
  itemList: any;
  public userid: string = "";
  public OrderId: string = "";
  private loader: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, public viewCntrl: ViewController) {
    this.item = this.navParams.get("itemData");
    this.userid = this.navParams.get("UserIDKey");
    this.OrderId = this.navParams.get("OrderId");


    // let orderDetails = this.item['OrderDetails'];
    let categoriesRef = firebase.database().ref("/Order/" + APP_CONFIG.UID + "/" + this.userid + "/" + this.OrderId + "/OrderDetails/");


    categoriesRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.itemList = snapshot.val();
        for (let data in this.itemList) {
          let itemrefrence = firebase.database().ref("/FoodList/" + this.itemList[data]['Categories'] + "/" + this.itemList[data]['ItemID']);
          itemrefrence.on("value", (snapshot2) => {
            this.loader=false;
            if (snapshot2.val() != null) {
              this.itemList[data]['imgPath'] = snapshot2.val()['ImagePath'];
              this.itemList[data]['Name'] = snapshot2.val()['Name'];
              this.itemList[data]['Description'] = snapshot2.val()['Description'];
            }
          })

        }
      }

    });
  }

  ionViewDidLoad() {

  }
  orderConfirmed() {
    let categoriesRef = firebase.database().ref("/Order/" + APP_CONFIG.UID + "/" + this.userid + "/" + this.OrderId + "/");
    let update = {
      "Status": "Confirmed"
    }
    categoriesRef.update(update).then(() => {
      this.toast.create({
        message: "Order confirmed successfully",
        duration: 3000
      }).present().then(() => {
        this.viewCntrl.dismiss();
      })
    })
  }
  Orderoutdelivery() {
    let categoriesRef = firebase.database().ref("/Order/" + APP_CONFIG.UID + "/" + this.userid + "/" + this.OrderId + "/");
    let update = {
      "Status": "Processing"
    }
    categoriesRef.update(update).then(() => {
      this.toast.create({
        message: "Order out for delivery",
        duration: 3000
      }).present().then(() => {
        this.viewCntrl.dismiss();
      })
    })
  }
  OrderDelivered() {
    let categoriesRef = firebase.database().ref("/Order/" + APP_CONFIG.UID + "/" + this.userid + "/" + this.OrderId + "/");
    let update = {
      "Status": "Delivered"
    }
    categoriesRef.update(update).then(() => {
      this.toast.create({
        message: "Order Delivered",
        duration: 3000
      }).present().then(() => {
        this.viewCntrl.dismiss();
      })
    })
  }
}
