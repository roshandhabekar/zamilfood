import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Platform,Slides } from 'ionic-angular';
import *as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import {FirebaseServiceProvider} from'../../providers/firebase-service/firebase-service';

//import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  @ViewChild(Slides) slides: Slides;
  private sliderData = {};
  private loader: boolean = true;
  private languagge: string = '';

  constructor(private FirebaseService:FirebaseServiceProvider,  public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modal: ModalController, private alertCtrl: AlertController, private translateService: TranslateService, private platform: Platform) {
    // this.translateService.setDefaultLang('en');
    // this.translateService.use('hr');
  }
  ionViewDidEnter() {

  }
  ionViewDidLoad() {
    this.languagge = this.translateService.currentLang;
    let slideRef = firebase.database().ref("/Slider");
    slideRef.on('value', (snapshot) => {
      this.sliderData = snapshot.val();
      setTimeout(() => {
        if (this.slides && this.navCtrl.getActive()) {
          this.slides.autoplay = 3000;
            this.slides.startAutoplay();
          this.slides.autoplayDisableOnInteraction = false;
          this.slides.update();
          this.FirebaseService.enableTabs();
          if (this.languagge == 'hr') {
            this.slides._rtl = true;
          }
          else {
            this.slides._rtl = false;
          }
        }
      }, 500);
      this.loader = false;
    });
  }
  contact() {
    this.navCtrl.push('ContactPage');
  }
  about() {
    this.navCtrl.push('AboutPage');
  }
  quality() {
    this.navCtrl.push('QualityPage');
  }
  vision() {
    this.navCtrl.push('VisionPage');
  }

  public ionViewWillLeave() {
    if (!this.loader && this.slides) {
      setTimeout(() => {
        this.slides.stopAutoplay();
      }, 800);
    }
  }
  public ionViewWillEnter() {
    if (!this.loader && this.slides) {
      this.slides.startAutoplay();
      this.slides.autoplay = 3000;
      this.slides.autoplayDisableOnInteraction = false;
          this.slides.update();
          if (this.languagge == 'hr') {
            this.slides._rtl = true;
          }
          else {
            this.slides._rtl = false;
          }
    }
  }

  languagechange() {
    this.storage.get('language').then(language => {
      let alert = this.alertCtrl.create();
      let data = this.translateService.instant('changeLanguage');
      let ok = this.translateService.instant('OK');
      let cancel = this.translateService.instant('Cancel');

      alert.setTitle(data);
      if (language != null) {
        if (language == 'hr') {
          alert.addInput({
            type: 'radio',
            label: 'English',
            value: 'en',
          });
          alert.addInput({
            type: 'radio',
            label: 'عربى',
            value: 'hr',
            checked: true
          });
        }
        else {
          alert.addInput({
            type: 'radio',
            label: 'English',
            value: 'en',
            checked: true
          });
          alert.addInput({
            type: 'radio',
            label: 'عربى',
            value: 'hr',
          });
        }
      }
      else {
        alert.addInput({
          type: 'radio',
          label: 'English',
          value: 'en',
        });
        alert.addInput({
          type: 'radio',
          label: 'عربى',
          value: 'hr',
          checked: true
        });
      }
      alert.addButton(cancel);
      alert.addButton({
        text: ok,
        handler: data => {
          this.languagge = data;
          this.storage.set('language', data).then(data => {});
          this.translateService.setDefaultLang(data);
          this.translateService.use(data);
          if (data == 'hr') {
            this.slides._rtl = true;
           
              this.platform.setDir('rtl', true);
            
          } else {
            this.slides._rtl = false;
           
              this.platform.setDir('ltr', true);
            
          }

        }
      });
      alert.present();
    });
  }
  moveToOrderPage(){
    this.navCtrl.parent.select(1);
  }

}
