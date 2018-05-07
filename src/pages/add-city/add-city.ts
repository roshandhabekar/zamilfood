import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import *as firebase from 'firebase';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-city',
  templateUrl: 'add-city.html',
})
export class AddCityPage {

  public city: String;
  public country: String;
  public cityArbic: String;
  public countryArabic: String;

  public key: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCntrl: ViewController,
    public fsp: FirebaseServiceProvider,
    public alerCntrl: AlertController,
    public zone: NgZone, private translateService: TranslateService) {

    this.key = this.navParams.get("key");
    if (this.key == undefined) {
      this.key = '';
    }
    if (this.key != '' && this.key != undefined) {
      let itemdetailsRef = firebase.database().ref("/CityList/" + this.key);
      itemdetailsRef.on("value", (snapshot) => {
        this.zone.run(() => {
          if (snapshot.val() != null) {
            this.city = snapshot.val()['city'];
            this.country = snapshot.val()['country'];
            this.cityArbic = snapshot.val()['cityArbic'];
            this.countryArabic = snapshot.val()['countryArabic'];
          }
        });
      });
    }

  }

  ionViewDidLoad() {
  }
  SaveCity() {
   let ok =  this.translateService.instant('OK');
   let Alert =  this.translateService.instant('Alert');
   let titletext =  this.translateService.instant('titletext');
   
    // let itemdetailsRef = firebase.database().ref("/CityList");
    let cityData = {
      "city": this.city,
      "country": this.country,
      "cityArbic": this.cityArbic,
      "countryArabic": this.countryArabic
    }
    if (this.city != "" && this.country != "" && this.cityArbic != "" && this.countryArabic != "") {
      let itemdetailsRef = firebase.database().ref("/CityList");
      let tempRes = itemdetailsRef.push(cityData);
      tempRes.then(() => {
        this.viewCntrl.dismiss();
      })
      // this.fsp.setCityToList(cityData).then(() => {
      //   this.viewCntrl.dismiss();
      // });
    } else {
      this.alerCntrl.create({
        title: Alert,
        subTitle: titletext,
        buttons: [ok]
      }).present();
    }

  }
  delete() {
    let itemdetailsRef = firebase.database().ref("/CityList/" + this.key);
    itemdetailsRef.remove().then(data => {
      this.viewCntrl.dismiss();
    })
  }
  EditCity() {
    let itemdetailsRef = firebase.database().ref("/CityList/" + this.key);
    let cityData = {
      "city": this.city,
      "country": this.country,
      "cityArbic": this.cityArbic,
      "countryArabic": this.countryArabic
    }
    if (this.city != "" && this.country != "" && this.cityArbic != "" && this.countryArabic != "") {
      itemdetailsRef.update(cityData).then(() => {
        this.viewCntrl.dismiss();
      });
    } else {
      this.alerCntrl.create({
        title: "Alert",
        subTitle: "Please enter all the details.",
        buttons: ["ok"]
      }).present();
    }
  }
}
