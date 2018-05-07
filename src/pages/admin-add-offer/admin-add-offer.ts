import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import *as firebase from 'firebase';

/**
 * Generated class for the AdminAddOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-add-offer',
  templateUrl: 'admin-add-offer.html',
})
export class AdminAddOfferPage {

  private filetoupload: any;
  private selectedPhoto= '';
  private loader: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCntrl: ViewController,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
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
  dismiss() {
    this.viewCntrl.dismiss();
  }
  addTooffer() {
    if(this.selectedPhoto != '')
    {
      this.loader =true;
      var timeNow = new Date().getTime();
      let temp = this.filetoupload.name.split(".");
      let filename = temp[0] + "_" + timeNow + "." + temp[1];
      let storage = firebase.storage().ref('slider/' + filename);
      storage.put(this.filetoupload).then((snapshot) => {
        let data = {
          'ImagePath': snapshot.downloadURL
        }
        let slideRef = firebase.database().ref("/Slider");
        slideRef.push(data);
        this.viewCntrl.dismiss();
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please select a image',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
