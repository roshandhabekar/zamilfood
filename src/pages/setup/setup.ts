import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ViewController, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';

import *as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  public options: Observable<any[]>;
  private selectedPhoto ='';
  private loader: boolean = true;
  private filetoupload: any;
  //private filename: any;
  public Type: String;
  public cityList: Observable<any[]>;
  public IsAdmin: Boolean = false;
  public categoryID = "";
  public item = {
    "AvaiCityId": "",
    "CreateDate": new Date(),
    "DateOfUpdate": new Date(),
    "Descrition": "",
    "ImagePath": "",
    "Name": "",
    "ArabicName":"",
    "ArabicDescriptions":""
  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams, private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    public firebaseService: FirebaseServiceProvider,
    public zone: NgZone,
    private viewContrl: ViewController) {
    this.cityList = this.firebaseService.CityList;

    this.IsAdmin = this.navParams.get("IsAdmin");
    this.categoryID = this.navParams.get("CategoryID");


    let categoriesitemRef = firebase.database().ref("/Categories" + '/' + this.categoryID);
    categoriesitemRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader = false;
        if (snapshot.val() != null) {
          let data = snapshot.val();
          this.item = data;
          this.selectedPhoto = this.item['ImagePath'];
        }
      });
    });


  }

  ionViewDidLoad() {
    this.Type = this.navParams.get("type");
  }
  AddCategory() {
    if (this.selectedPhoto != '' && this.item['AvaiCityId'] != '' && this.item['Descrition'] != '') {
      this.loader =true;
      var timeNow = new Date().getTime();
      let temp = this.filetoupload.name.split(".");
      let filename = temp[0] + "_" + timeNow + "." + temp[1];
      let storage = firebase.storage().ref('catagories/' + filename);
      storage.put(this.filetoupload).then((snapshot) => {
        this.item['ImagePath'] = snapshot.downloadURL;
        this.firebaseService.setFirebaseDataList("Categories", this.item);
        // this.loader =false;
        this.dismiss();
      }, (error) => {

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
  changePicture(): void {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {

          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  SaveCategory() {
    if (this.selectedPhoto != '' && this.item['AvaiCityId'] != '' && this.item['Descrition'] != '') {
      this.loader =true;
      this.item['ImagePath']  = this.selectedPhoto;
      let categoriesitemRef = firebase.database().ref("/Categories" + '/' + this.categoryID);
      categoriesitemRef.update(this.item).then(() => {
        // this.loader =false;
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
    this.viewContrl.dismiss(this.categoryID);
  }
}