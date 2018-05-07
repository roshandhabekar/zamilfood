import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import *as firebase from 'firebase';
import { App } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private username = "";
  private password = "";
  private loader:boolean =false;

  constructor(private app:App,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }
  loginToAdminPanel() {
    if (this.username != '' && this.password != '') {
      this.loader=true;
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(auth => {
        this.loader=false;
        this.app.getRootNav().setRoot("AdminPanelPage");
        this.viewCtrl.dismiss();
      }, (err) => {
        this.loader=false;
        let alert = this.alertCtrl.create({
          title: 'Alert!',
          subTitle: 'You have entered an invalid username or password',
          buttons: ['OK']
        });
        alert.present();
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Please enter both username and password',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
