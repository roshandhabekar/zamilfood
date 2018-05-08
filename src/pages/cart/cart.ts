import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import *as firebase from 'firebase';
import { APP_CONFIG } from '../../config/appsettings';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
// import { snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';



@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  private default_language = "";

  private cartData: any;
  public foodlist: any;
  private totalPrice = 0;
  private noCart: boolean;
  private shownodata: boolean;
  private userID = '';
  private emailId = '';
  private phoneno = '';
  private instruction = '';
  private address = '';
  private name = "";
  private loader: boolean = true;
  private taxVal: any;
  private citylist: Observable<any[]>;
  private cityname = '';
  private shipingCharges = 0;
  private orderid: any;
  private getTime= new Date();

  constructor(private storage: Storage, public navCtrl: NavController,
    public navParams: NavParams, public toast: ToastController, private translateService: TranslateService,
    private modalCtrl: ModalController, private alertController: AlertController,
    private fbs: FirebaseServiceProvider) {
    let categoriesRef = firebase.database().ref("/CityList");
    categoriesRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.citylist = snapshot.val();
      }
    });
    let orderidRef = firebase.database().ref("/OrderId");
    orderidRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.orderid = snapshot.val()['OrderId'];
      }
    });
    this.noCart = false;
    this.shownodata = false;
    let taxRef = firebase.database().ref("/Taxes/");
    taxRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        let taxdata = snapshot.val();
        for (let key in taxdata) {
          if (taxdata[key]['taxname'] == "VAT") {
            this.taxVal = taxdata[key]['percentage'];
          }
        }
      }
    })
  }

  ionViewWillEnter() {
    this.storage.get('language').then((language) => {
      if (language != null) {
        this.default_language = language;
      }
      else {
        this.default_language = 'hr';
      }
    });
    let foodlistRef = firebase.database().ref("/FoodList");
    foodlistRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.foodlist = snapshot.val();
        this.storage.get('userID').then((userId) => {
          if (userId != null) {
            this.userID = userId;
            let oredrRef = firebase.database().ref("/Cart" + '/' + userId);
            oredrRef.on("value", (snapshot) => {
              this.shownodata = true;
              if (snapshot.val() != null) {
                this.noCart = true;
                this.cartData = snapshot.val();
                this.totalPrice = 0;
                for (let key in this.cartData) {
                  this.cityname = this.cartData[key]['CityName'];
                  this.setCity();
                  // this.cartData[key]['ImagePath'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['ImagePath'];
                  this.cartData[key]['Description'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['Description'];
                  this.cartData[key]['DescriptionArabic'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['DescriptionArabic'];
                  this.cartData[key]['NameArbic'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['NameArabic'];
                  this.cartData[key]['Name'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['Name'];
                  this.cartData[key]['price'] = this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['Price'];
                  this.totalPrice = Number(this.totalPrice) + Number(this.foodlist[this.cartData[key]['Categories']][this.cartData[key]['ItemID']]['Price']) * Number(this.cartData[key]['Quantity']);
                }
              }
              else {
                this.noCart = false;
              }
            });
          }
          else {
            this.shownodata = true;
            this.noCart = false;
          }
        });
      }
      this.loader = false;
    });
  }
  deleteItem(keyvalue) {
    let oredrRef = firebase.database().ref("/Cart" + '/' + this.userID + '/' + keyvalue);
    oredrRef.remove();
  }
  ionViewDidLoad() {
  }
  removeItem(keyvalue) {
    let oredrRef = firebase.database().ref("/Cart" + '/' + this.userID + '/' + keyvalue);
    oredrRef.once('value', (snapshot) => {
      let data = snapshot.val()['Quantity'];
      if (data == 1) {
        this.deleteItem(keyvalue);
      }
      else {
        let newQuantity = {
          "Quantity": Number(data) - 1
        }
        oredrRef.update(newQuantity);
      }
    });
  }
  addItem(keyvalue) {
    let oredrRef = firebase.database().ref("/Cart" + '/' + this.userID + '/' + keyvalue);
    oredrRef.once('value', (snapshot) => {
      let data = snapshot.val()['Quantity'];
      let newQuantity = {
        "Quantity": Number(data) + 1
      }
      oredrRef.update(newQuantity);
    });
  }
  placeorder() {
    console.log(this.getTime);
    let orderArr = {
      "Email": this.emailId,
      "Name": this.name,
      "Phone": this.phoneno,
      "City": this.cityname,
      "OrderInstruction": this.instruction,
      "OrderDeliveryAddress": this.address,
      "OrderDetails": this.cartData,
      "Price": (Number(this.shipingCharges) + Number(this.totalPrice)) + ((Number(this.totalPrice) + Number(this.shipingCharges)) * (Number(this.taxVal) / 100)),
      "Tax": (Number(this.shipingCharges) + Number(this.totalPrice)) * this.taxVal / 100,
      "ShipingCharge": this.shipingCharges,
      "TimeOrderPlaced": String(this.getTime),
      "Subtotal": this.totalPrice,
      "Status": "Pending",
      "orderId": '#Zamil' + String(this.orderid),
      "cartData": this.cartData
    }
    let Thanks_zamil = this.translateService.instant('Thanks_zamil');
    let Alert = this.translateService.instant('Alert');
    let OK = this.translateService.instant('OK');
    let fill_up_delivery = this.translateService.instant('fill_up_delivery');
    let cart_total_less_price = this.translateService.instant('cart_total');
    if (this.emailId != '' && this.name != '' && this.phoneno != '' && this.cityname != '' && this.address != '') {
      if (this.totalPrice > 100) {
        this.loader = true;
        let oredrRef = firebase.database().ref("/Order" + '/' + APP_CONFIG.UID + '/' + this.userID);
        console.log(orderArr);
            let orderDetails = oredrRef.push(orderArr);
        orderDetails.then(data => {
          let oredrRef = firebase.database().ref("/Cart" + '/' + this.userID);
          this.loader = false;
          oredrRef.remove();
          let orderidRef = firebase.database().ref("/OrderId");
          let orderidchange = {
            'OrderId': Number(this.orderid) + Number(1)
          };
          orderidRef.update(orderidchange);
          this.toast.create({
            message: Thanks_zamil,
            duration: 3000,
            dismissOnPageChange: true,
            position: "top"
          }).present();
        });
        this.fbs.sendmail(orderArr, this.userID);

      } else {



        this.alertController.create({
          title: Alert,
          subTitle: cart_total_less_price,
          buttons: [OK]
        }).present();
      }

    } else {
      this.alertController.create({
        title: Alert,
        subTitle: fill_up_delivery,
        buttons: [OK]
      }).present();
    }


  }
  login() {
    let modal = this.modalCtrl.create('LoginPage');
    modal.present();
  }
  moveToMenu() {

  }
  setCity() {
    for (let key in this.citylist) {
      if (this.citylist[key]['city'] == this.cityname) {
        if (this.citylist[key]['charge']) {
          this.shipingCharges = this.citylist[key]['charge'];
          // this.toast.create({
          //   message:"Shiping charges has updated as per selected city.",
          //   duration:3000,
          //   position:"top"
          // }).present();
        }

      }
    }


  }
}
