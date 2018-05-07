import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import *as firebase from 'firebase';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-tax-add',
  templateUrl: 'tax-add.html',
})
export class TaxAddPage {
  taxname = "";
  percentage: Number;
  private keyVal: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCntrl: AlertController,
    public fsp: FirebaseServiceProvider,
    public viewCntrl: ViewController,
    private zone: NgZone) {
    this.keyVal = this.navParams.get("key");
    let itemdetailsRef = firebase.database().ref("/Taxes/" + this.keyVal);
    itemdetailsRef.on("value", (snapshot) => {
      this.zone.run(() => {

        if (snapshot.val() != null) {
          this.taxname = snapshot.val()['taxname'];
          this.percentage = snapshot.val()['percentage'];
        }
      });
    });
  }

  ionViewDidLoad() {
    
  }
  SaveTax() {
    if (this.keyVal != "" && this.keyVal != undefined) {
      this.update();
    } else {


      let taxData = {
        "taxname": this.taxname,
        "percentage": this.percentage
      }      
      if (this.taxname != "" && this.percentage != null) {
        this.fsp.setTaxToTaxList(taxData).then(() => {          
          this.viewCntrl.dismiss();
        });
      } else {
        this.alertCntrl.create({
          title: "Alert",
          subTitle: "Please enter all the details.",
          buttons: ["ok"]
        }).present();
      }
    }
  }
  delete() {
    let itemdetailsRef = firebase.database().ref("/Taxes/" + this.keyVal);
    itemdetailsRef.remove().then(() => {
      this.viewCntrl.dismiss();
    })
  }
  update() {
    let itemdetailsRef = firebase.database().ref("/Taxes/" + this.keyVal);
    let taxData = {
      "taxname": this.taxname,
      "percentage": this.percentage
    }
    if (this.taxname != "" && this.percentage != null) {
      itemdetailsRef.update(taxData).then(() => {        
        this.viewCntrl.dismiss();
      })
    } else {
      this.alertCntrl.create({
        title: "Alert",
        subTitle: "Please enter all the details.",
        buttons: ["ok"]
      }).present();
    }
  }

}
