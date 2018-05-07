import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import *as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {
  private title: "";
  private url = '';
  private categoryId = '';
  public foodlistitems: Observable<any[]>;
  public IsAdmin: Boolean = false;
  private itemlist: any;
  private itemList2 = [];
  private itemList1 = [];
  private loader: boolean = true;
  private cityName: String = "";
  private default_language = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private zone: NgZone, private translateService: TranslateService,
    public modalCntrl: ModalController, public alertCtrl: AlertController) {

      
    this.IsAdmin = this.navParams.get("IsAdmin");
    this.default_language = this.translateService.currentLang;
    //this.title = this.navParams.get("title");
    this.categoryId = this.navParams.get("ItemID");
    this.cityName = this.navParams.get("cityname");
    let categoriesitemRef = firebase.database().ref("/Categories" + '/' + this.categoryId);
    categoriesitemRef.on("value", (snapshot) => {
      this.zone.run(() => {
        if (snapshot.val() != null) {
          let data = snapshot.val();
          this.url = data.ImagePath;
          if (this.default_language == 'en') {
            this.title = data.Name;
          } else {
            this.title = data.ArabicName;
          }

        }
      });
    });
    let itemlistRef = firebase.database().ref("/FoodList" + '/' + this.categoryId);
    itemlistRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          if (this.cityName.length != 0 && this.cityName != "" && this.cityName != undefined) {
            let data = snapshot.val();
            for (let key in data) {
              data[key]["key"] = key;
              this.itemList2.push(data[key]);
            }
            this.initialize();
          } else {
            let data = snapshot.val();
            for (let key in data) {
              data[key]["key"] = key;
              this.itemList1.push(data[key]);
            }

            this.itemlist = this.itemList1;
            // this.itemlist = snapshot.val();
          }

        }
        else {
          this.itemlist = '';
        }
      });
    });
  }
  initialize() {
    //this.itemlist = this.itemlist.filter()
    this.itemlist = this.itemList2.filter((item) => {
      return (item.AvaiCityId.indexOf(this.cityName) != -1)
    });
  }
  ionViewDidLoad() {

    // this.url =this.navParams.get("URL");

    // this.foodlistService.getFoodList(this.categoryId);
    this.IsAdmin = this.navParams.get("IsAdmin");

    
  }
  fooddetails(data, name) {
    this.navCtrl.push('FoodDetailPage',
      {
        'ItemId': data,
        'categoryId': this.categoryId,
        'itemName': name,
        'IsAdmin': this.IsAdmin,
        'cityName': this.cityName
      });
  }
  addItemToListing() {
    this.modalCntrl.create("AddItemPage", {
      "CategoryID": this.categoryId
    }).present();
  }
  DeleteCategory() {
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
            this.removeCategoryFromDB();
          }
        }
      ]
    });
    confirm.present();
  }
  removeCategoryFromDB() {
    this.loader = true;
    let itemlistRef = firebase.database().ref("/Categories" + '/' + this.categoryId + "/");
    itemlistRef.remove().then(() => {
      this.loader = false;
      this.navCtrl.pop();
    })
  }
  editCategory() {
    let setupModal = this.modalCntrl.create("SetupPage", {
      "CategoryID": this.categoryId,
      "type": "Category",
      "IsAdmin": this.IsAdmin
    });
    
    setupModal.present()
    setupModal.onDidDismiss(data => {
      this.categoryId = data;
      this.getData();
    });
  }

  getData() {
    let categoriesitemRef = firebase.database().ref("/Categories" + '/' + this.categoryId);
    categoriesitemRef.on("value", (snapshot) => {
      this.zone.run(() => {
        if (snapshot.val() != null) {
          let data = snapshot.val();
          this.url = data.ImagePath;
          if (this.default_language == 'en') {
            this.title = data.Name;
          } else {
            this.title = data.ArabicName;
          }

        }
      });
    });
    let itemlistRef = firebase.database().ref("/FoodList" + '/' + this.categoryId);
    itemlistRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          if (this.cityName.length != 0 && this.cityName != "" && this.cityName != undefined) {
            let data = snapshot.val();
            for (let key in data) {
              data[key]["key"] = key;
              this.itemList2.push(data[key]);
            }
            this.initialize();
          } else {
            let data = snapshot.val();
            for (let key in data) {
              data[key]["key"] = key;
              this.itemList1.push(data[key]);
            }

            this.itemlist = this.itemList1;
            // this.itemlist = snapshot.val();
          }

        }
        else {
          this.itemlist = '';
        }
      });
    });
  }
}