import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import *as firebase from 'firebase';

/**
 * Generated class for the AdminPaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-payments',
  templateUrl: 'admin-payments.html',
})
export class AdminPaymentsPage {

  private sliderData: any;
  private loader: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    let slideRef = firebase.database().ref("/Slider");
    slideRef.on('value', (snapshot) => {
      this.sliderData = snapshot.val();
      this.loader = false;
    });
  }

  ionViewDidLoad() {
  
  }
  logout() {
    firebase.auth().signOut().then(function () {
      this.navCtrl.setRoot("TabsPage");
    }).catch(function (error) {
      // An error happened.
    });
    // let modal = this.modalCtrl.create('LoginPage');
    // modal.present();
  }
  addoffer() {
    let modal = this.modalCtrl.create('AdminAddOfferPage');
    modal.present();
  }
  deleteOffer(id) {
    let confirm = this.alertCtrl.create({
      title: 'Alert!',
      message: 'Are you sure you want to delete this offer?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.loader=true;
            let slidedelRef = firebase.database().ref("/Slider" + '/' + id);
            slidedelRef.remove();
            this.loader=false;
          }
        }
      ]
    });
    confirm.present();
  }

}
