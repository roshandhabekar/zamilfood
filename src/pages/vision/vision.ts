import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the VisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vision',
  templateUrl: 'vision.html',
})
export class VisionPage {

  private ourvision = '';
  private ourmission = '';
  private ourvalues = '';
  private isadmin: boolean;
  private loader: boolean = true;
  private default_language = ''; 


  constructor(private storage:Storage,public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    if (this.navParams.get("type") == 'Admin') {
      this.isadmin = false;
    }
    else {
      this.isadmin = true;
    }
    let visionRef = firebase.database().ref("/Vision");
    visionRef.on('value', (snapshot) => {
      if (snapshot.val() != null) {
       // let data = snapshot.val();
      //  this.ourvision = data['OurVision'];
      //  this.ourmission = data['OurValues'];
      //  this.ourvalues = data['OurMission'];
      }
      this.loader = false;
    });
    this.storage.get('language').then((language) => {
      if (language != null) {
        this.default_language = language;
      }
      else {
        this.default_language = 'hr';
      }
    });
  }

  ionViewDidLoad() {

  }
  save() {
    let visionRef = firebase.database().ref("/Vision");
    var updateData = {
      'OurVision': this.ourvision,
      'OurValues': this.ourmission,
      'OurMission': this.ourvalues
    }
    visionRef.update(updateData);
  }
  login() {
    var user = firebase.auth().currentUser;
    if (user == null) {
      let modal = this.modalCtrl.create('LoginPage');
      modal.present();
    }
  }

}
