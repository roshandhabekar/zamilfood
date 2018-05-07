import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import *as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-tax',
  templateUrl: 'tax.html',
})
export class TaxPage {
  taxList: any;
  private loader :boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCntrl: ModalController, private zone: NgZone) {
    let itemdetailsRef = firebase.database().ref("/Taxes/");
    itemdetailsRef.on("value", (snapshot) => {
      this.zone.run(() => {
        if (snapshot.val() != null) {
          this.taxList = snapshot.val();
          this.loader =false;
        }
      });
    });
  }

  ionViewDidLoad() {
  }
  addTax() {
    this.navCtrl.push("TaxAddPage");
  }
  viewTax(item) {
    
    this.navCtrl.push("TaxAddPage",{key:item});
  }
}
