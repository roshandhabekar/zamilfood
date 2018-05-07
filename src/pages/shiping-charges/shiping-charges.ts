import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-shiping-charges',
  templateUrl: 'shiping-charges.html',
})
export class ShipingChargesPage {
  citylist: any;
  private loader: boolean = true;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let foodlistRef = firebase.database().ref("/CityList");
    foodlistRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.citylist = snapshot.val();
        this.loader = false;
      }
    });
  }

  ionViewDidLoad() {
    
  }
  addShipingCharges() {
    this.navCtrl.push("ShipingChargesAddPage");
  }
  editCity(item) {
    this.navCtrl.push("ShipingChargesAddPage", {
      key: item
    });
  }
}
