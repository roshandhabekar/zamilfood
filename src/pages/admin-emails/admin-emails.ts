import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import *as firebase from 'firebase';
//import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from'../../config/appsettings';

@IonicPage()
@Component({
  selector: 'page-admin-emails',
  templateUrl: 'admin-emails.html',
})
export class AdminEmailsPage {
  public emailsList: any;
  private loader: boolean = true;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseServiceProvider,public zone:NgZone) {
  // /  this.emailsList = this.firebaseProvider.EmailsList;

    let categoriesRef = firebase.database().ref("/ContactUs/" + APP_CONFIG.UID);
    categoriesRef.on("value", (snapshot) => {
      this.zone.run(() => {
        this.loader=false;
        // this.loader = false;
        if (snapshot.val() != null) {
        
          this.emailsList = snapshot.val();
        }
      });
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
  viewEmails()
  {
    
  }

}
