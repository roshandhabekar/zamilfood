import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { APP_CONFIG } from '../../config/appsettings';
import *as firebase from 'firebase';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  private name = '';
  private email = '';
  private message = '';
  private adminUID = APP_CONFIG.UID;


  constructor(private alertCtrl: AlertController, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public modalCntrl: ModalController) {
  }

  ionViewDidLoad() {
  }
  sent() {
    if (this.name != '' && this.email != '' && this.message != '') {
      this.storage.get('userID').then((id) => {
        if (id != null) {
          this.sentmessage(id)
        }
        else {
          let key = firebase.database().ref("/ContactUs" + '/' + this.adminUID).push().key;
          this.storage.set('userID', key);
          this.sentmessage(key)
        }
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please fill the all details.',
        buttons: ['OK']
      });
      alert.present();
    }

  }
  sentmessage(id) {
    let contactRef = firebase.database().ref("/ContactUs" + '/' + this.adminUID);
    let messagedata = {
      "Email": this.email,
      "Message": this.message,
      "Name": this.name,
      "Time": new Date(),
      "Flag": 'Unread',
      'Sender': id
    };
    contactRef.push(messagedata);
    this.name = '';
    this.email = '';
    this.message = '';
    let alert = this.alertCtrl.create({
      title: 'Hi',
      subTitle: 'Thank you for contacting us.We will get back you soon.',
      buttons: ['OK']
    });
    alert.present();
  }
}
