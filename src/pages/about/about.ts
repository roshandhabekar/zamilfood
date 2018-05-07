import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import *as firebase from 'firebase';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private name = '';
  private email = '';
  private address = '';
  private phoneno = '';
  private about = '';
  private isadmin: boolean;
  // private show = false;
  private loader: boolean = true;




  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.get('type') == 'Admin') {
      this.isadmin = false;
    }
    else {
      this.isadmin = true;
    }
    let aboutRef = firebase.database().ref("/About");
    aboutRef.on('value', (snapshot) => {
      if (snapshot.val() != null) {
        let data = snapshot.val();
    //    this.name = data['Company Name'];
        // this.email = data['Email'];
        // this.address = data['Address'];
        // this.phoneno = data['PhoneNo'];
        //this.about = data['About Us'];
      }
      this.loader =false;
    });
  }

  ionViewDidLoad() {
  }
  save() {
    let aboutRef = firebase.database().ref("/About");
    var updateData = {
      'Company Name': this.name,
      'Email': this.email,
      'Address': this.address,
      'PhoneNo': this.phoneno,
      'About Us': this.about
    }
    aboutRef.update(updateData);
  }

}
