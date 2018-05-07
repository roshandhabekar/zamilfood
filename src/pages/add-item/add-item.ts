import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController,AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  private categoryID: String = "";
  public cityList: Observable<any[]>;
  private selectedPhoto: any;
  private filetoupload: any;
  public itemId = "";
  public IsAdmin: Boolean = false;
  private loader: boolean = true;
  public foodItem = {
    "CreateDate": new Date(),
    "Description": "",
    "DescriptionArabic": "",
    "ImagePath": "",
    "Name": "",
    "NameArabic": "",
    "Price": null,
    "Quoantiy": null,
    "Ratings": 5,
    "Pictures": {
      "imagpath1": "",
      "imagpath2": "",
      "imagpath3": ""
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseService: FirebaseServiceProvider,private alertCtrl:AlertController,
    public toast: ToastController,
    public viewCntrl: ViewController,
    public zone: NgZone) {
    this.cityList = this.firebaseService.CityList;
    this.categoryID = this.navParams.get("CategoryID");
    this.itemId = this.navParams.get("itemId");
    this.IsAdmin = this.navParams.get("IsAdmin");

    let itemdetailsRef = firebase.database().ref("/FoodList" + '/' + this.categoryID + '/' + this.itemId);
    itemdetailsRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          let data = snapshot.val();
          this.foodItem = data;
          this.selectedPhoto = this.foodItem['ImagePath'];
        }
      });
    });
  }

  ionViewDidLoad() {
  }
  addToList() {
    if (this.selectedPhoto != '' && this.foodItem['Name'] != '' && this.foodItem['Descrition'] != '' && this.foodItem['Price'] != '' && this.foodItem['Quoantiy'] != '') {
      this.loader = true;
      var timeNow = new Date().getTime();
      let temp = this.filetoupload.name.split(".");
      let filename = temp[0] + "_" + timeNow + "." + temp[1];
      let storage = firebase.storage().ref('items/' + filename);
      storage.put(this.filetoupload).then((snapshot) => {
        this.foodItem['ImagePath'] = snapshot.downloadURL;
        // this.loader = false;
        this.firebaseService.setItemToCategoryList(this.categoryID, this.foodItem).then(data => {
          this.toast.create({
            message: "Item added successfully",
            duration: 3000
          }).present().then(() => {
            this.dismiss();
          });
        })
      }, (error) => {
        this.loader = false;
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please fill all the details',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  SaveCategory() {
    if (this.selectedPhoto != '' && this.foodItem['Name'] != '' && this.foodItem['Descrition'] != '' && this.foodItem['Price'] != '' && this.foodItem['Quoantiy'] != '') {
      this.loader = true;
      this.foodItem['ImagePath']  = this.selectedPhoto;
      let itemdetailsRef = firebase.database().ref("/FoodList" + '/' + this.categoryID + '/' + this.itemId);
      itemdetailsRef.update(this.foodItem).then(() => {
        // this.loader = false;
        this.dismiss();
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please fill all the details',
        buttons: ['OK']
      });
      alert.present();
    }
   
  }
  filechoose(event: any) {
    this.filetoupload = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedPhoto = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  dismiss()
  {
    this.viewCntrl.dismiss();
  }
}
