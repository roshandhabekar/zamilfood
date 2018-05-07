import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import *as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../config/appsettings';

@IonicPage()
@Component({
  selector: 'page-admin-orders',
  templateUrl: 'admin-orders.html',
})
export class AdminOrdersPage {
  public orderList=[];
  private loader: boolean = true;
  private orderdata=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public modalController: ModalController) {
    let categoriesRef = firebase.database().ref("/Order/" + APP_CONFIG.UID);
    categoriesRef.on("value", (snapshot) => {
      this.loader = false;
      if (snapshot.val() != null) {
        this.orderdata =[];
        this.orderList=[];
        let alldata = snapshot.val();
        for(let data in alldata)
        {
          for(let data2 in alldata[data])
          {
            alldata[data][data2]['clientid'] = data;
            alldata[data][data2]['orderkey'] = data2;
           this.orderdata.push(alldata[data][data2]);
          }
        }
        this.initialize();
      }
    });
  }
  logout() {
    firebase.auth().signOut().then((data) => {
      this.navCtrl.setRoot("TabsPage");
    }).catch(function (error) {
      // An error happened.
    });
  }

  ionViewDidLoad() {
    
  }

  ViewOrderAdmin(userid, orderid,itemdata) {
    
    this.navCtrl.push("AdminOrderViewPage", {
      "UserIDKey": userid,
      "OrderId": orderid,
      "itemData": itemdata
    });
    // this.modalController.create("AdminOrderViewPage", {
    //   "UserIDKey": userid,
    //   "OrderId": orderid,
    //   "itemData": this.orderList[userid][orderid]
    // }).present();
  }
  getItems(ev: any)
  {
    this.initialize();
      let val = ev.target.value;
      if (val && val.trim() != '') {
        this.orderList = this.orderList.filter((item) => {
          return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            item.OrderDeliveryAddress.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            item.orderId.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })

    // return String(value).indexOf(args) > -1;
        // this.orderList = this.orderList.filter((item) => {
        //   return true;
        //   // (String(item.AircraftType).toLowerCase().indexOf(val.toLowerCase()) > -1 )
        // });
      }
  }
  initialize() {
    this.orderList = this.orderdata;
  }
}
