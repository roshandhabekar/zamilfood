import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public result = [];
  private isAdmin: boolean = false;
  private citylist: Observable<any[]>;
  private cityname = '';
  private result2 = [];
  private loader: boolean = true;
  private selected: boolean = false;
  private default_language = "";
  private selectLanguage ={
    'Ok':'',
    'Cancel':''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider, private viewCntrl: ViewController, private translateService: TranslateService,
    private zone: NgZone, private modalCtrl: ModalController, private storage: Storage, private toastCtrl: ToastController) {


    this.loader = true;

    //getting the data of catagories


    let categoriesRef = firebase.database().ref("/Categories");
    categoriesRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          this.result = [];
          let data = snapshot.val();
          for (let key in data) {
            data[key]["key"] = key;
            this.result.push(data[key]);
          }
          this.initialize();
        }
      });
    });
    this.storage.get('userID').then((userId) => {
      if (userId != "" && userId != undefined) {
        let oredrRef = firebase.database().ref("/Cart" + '/' + userId);
        oredrRef.on("value", (snapshot) => {
          if (snapshot.val() != null) {
            this.selected = true;
          } else {
            this.selected = false;
          }
        });
      }
    })
    this.citylist = this.firebaseService.CityList;
  }
  ionViewDidLoad() {
    this.isAdmin = this.navParams.get("fromAdmin");


  }
  ionViewWillEnter() {
    this.default_language = this.translateService.currentLang;
    this.selectLanguage['Ok'] = this.translateService.instant('OK');
    this.selectLanguage['Cancel'] =this.translateService.instant('Cancel');;
  }
  viewListingByCategory(type, ItemId) {
    if (this.isAdmin) {
      this.navCtrl.push("ListingPage", {
        "title": type,
        "ItemID": ItemId,
        "IsAdmin": this.isAdmin,
        "cityname": this.cityname
      });
    }
    else {
      if (this.cityname != '') {
        this.navCtrl.push("ListingPage", {
          "title": type,
          "ItemID": ItemId,
          "IsAdmin": this.isAdmin,
          "cityname": this.cityname
        });
      }
      else {
        let ok = this.translateService.instant('OK');
        let Alert = this.translateService.instant('Alert');
        let titletext = this.translateService.instant('Select_Delivery_City');
        let alert = this.alertCtrl.create({
          title: Alert,
          subTitle: titletext,
          buttons: [ok]
        });
        alert.present();
      }
    }
  }
  close() {
    this.viewCntrl.dismiss();
  }
  addNewCategory() {
    this.navCtrl.push("SetupPage", {
      "type": "Category"
    });
  }
  login() {
    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
  }
  onChange() {

    this.initialize();


    this.result2 = this.result2.filter((item) => {

      return (item.AvaiCityId.indexOf(this.cityname) != -1)
    });
  }
  initialize() {
    this.result2 = this.result;
  }
  showAlert() {

    let placeorder = this.translateService.instant('place_order_cart');
    if (!this.selected) {
    }
    else {
      let toast = this.toastCtrl.create({
        message: placeorder,
        duration: 2000
      });
      toast.present();
    }
  }
}
