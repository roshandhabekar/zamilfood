import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-city-setup',
  templateUrl: 'city-setup.html',
})
export class CitySetupPage {
  cityList:any;
  private loader :boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public fsp:FirebaseServiceProvider,public zone:NgZone) {
    let categoriesRef = firebase.database().ref("/CityList");
    categoriesRef.on("value", (snapshot) => {
      this.zone.run(() => {
        if (snapshot.val() != null) {
          this.cityList = snapshot.val();
          this.loader =false;
        }
      });
    });
  }
 ionViewDidLoad() {
  }
  addCity(){
    this.navCtrl.push("AddCityPage");
  }
  editCity(key){
    this.navCtrl.push("AddCityPage",{
      key:key
    })
  }
  delete(){    
    
  }
}
