import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html',
})
export class FoodDetailPage {

  private quantity = 0;
  private url = '';
  private description = '';
  private price = '';
  private itemId = '';
  private categoryId = '';
  private itemName = '';
  private userID = '';
  private IsAdmin: Boolean = false;
  private loader: boolean = true;
  private cityName:'';
  private default_language = "";

  constructor(private event: Events,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone,
    private alertCtrl: AlertController,private translateService: TranslateService,
    private modalCntrl: ModalController) {

    this.default_language = this.translateService.currentLang;

    this.itemId = this.navParams.get('ItemId');
    this.categoryId = this.navParams.get('categoryId');
    //this.itemName = this.navParams.get('itemName');
    this.IsAdmin = this.navParams.get("IsAdmin");
    this.cityName = this.navParams.get('cityName');  
    let itemdetailsRef = firebase.database().ref("/FoodList" + '/' + this.categoryId + '/' + this.itemId);
    itemdetailsRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          let data = snapshot.val();
         if(this.default_language=='en'){
          this.itemName = data.Name;
          this.description = data.Description;
         }else{
          this.itemName = data.NameArabic;
          this.description = data.DescriptionArabic;
         }
          
          this.url = data.ImagePath;
          this.price = data.Price;
         
        }
      });
    });
  }

  ionViewDidLoad() {
  }
  add() {
    this.quantity = this.quantity + 1;
  }

  reduce() {
    if (this.quantity != 0) {
      this.quantity = this.quantity - 1;
    }
  }
  addtocart() {
    let order = {
      'Categories': this.categoryId,
      'ItemID': this.itemId,
      'Quantity': this.quantity,
      'Date': new Date(),
      'Update': '',
      'CityName':this.cityName
    }
    let oredrRef = firebase.database().ref("/Cart" + '/' + this.userID);
    oredrRef.push(order);
    this.quantity=0;
  }
  checkKart() {
    
    if (this.quantity > 0) {
      this.loader = true;
      this.storage.get('userID').then((val) => {
        this.loader = false;
        if (val != null) {
          this.userID = val;
          this.addtocart();
        }
        else {
          let key = firebase.database().ref("/Cart").push().key;
          this.storage.set('userID', key);
          this.userID = key;
          this.addtocart();
          this.event.publish('addedcart', this.userID);
        }
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please select quantity',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  DeleteItem() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Do you agree to remove all food items added to this category?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.loader = true;
            let itemdetailsRef = firebase.database().ref("/FoodList" + '/' + this.categoryId + '/' + this.itemId);
            itemdetailsRef.remove().then(() => {
              this.loader = false;
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    confirm.present();

  }
  editItem() {
    let setupModal = this.modalCntrl.create("AddItemPage", {
      "CategoryID": this.categoryId,
      "itemId": this.itemId,
      "IsAdmin": this.IsAdmin
    });
    setupModal.present()
    setupModal.onDidDismiss(data => {

    });
  }

}
