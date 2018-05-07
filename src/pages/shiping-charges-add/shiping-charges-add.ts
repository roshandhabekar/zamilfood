import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
//import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import *as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-shiping-charges-add',
  templateUrl: 'shiping-charges-add.html',
})
export class ShipingChargesAddPage {
  public cityname = '';
  citylist: Observable<any[]>;
  Charges= '';
  key='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCntrl: ViewController) {

    let foodlistRef = firebase.database().ref("/CityList/");
    foodlistRef.on("value", (snapshot) => {
      if (snapshot.val() != null) {
        this.citylist = snapshot.val();
      }
    });
    this.key = this.navParams.get("key");
    if (this.key != "" && this.key != undefined) {
     this.cityname =  this.citylist[this.key]['city'];
     this.Charges =  this.citylist[this.key]['charge'];
    }

  }

  ionViewDidLoad() {
  }
  SaveCharges(cityname) {
    if (this.key != "" && this.key != undefined) {
      let foodlistRef = firebase.database().ref("/CityList/" + this.key);
      this.citylist[this.key]['charge'] =this.Charges;
      foodlistRef.update(this.citylist[this.key]).then(()=>{
        this.viewCntrl.dismiss();
      })

    }else{
      for (let item in this.citylist) {
        if (this.citylist[item]['city'] == cityname) {
          let foodlistRef = firebase.database().ref("/CityList/" + item);
          this.citylist[item]['charge'] = this.Charges;
          foodlistRef.update(this.citylist[item]).then(() => {
            this.viewCntrl.dismiss();
          });
  
        }
      }
    }
 
    
  }
 
}
