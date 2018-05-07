import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
// import { App } from 'ionic-angular';
// import { HomePage } from '../pages/home/home';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translateService: TranslateService,
     public storage: Storage) {
    var firebaseConfig = {
      apiKey: "AIzaSyAeuJH473c3BVxhtLu6Xzu-TRAPwOum4-c",
      authDomain: "zamil-food.firebaseapp.com",
      databaseURL: "https://zamil-food.firebaseio.com",
      projectId: "zamil-food",
      storageBucket: "zamil-food.appspot.com",
      messagingSenderId: "192912349008"
    };
    firebase.initializeApp(firebaseConfig);
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Menu', component: "TabsPage" },
      { title: 'About Us', component: "AboutPage" },
      { title: 'Contact Us', component: "ContactPage" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('en');
      // this.translateService.use('hr');
      // if (!this.platform.isRTL) {
      //   this.platform.setDir('rtl', true);
      // }
      this.storage.get('language').then(lang => {
        if (lang != null) {
          //this.translateService.setDefaultLang(lang);
          if(lang == 'en'){
            this.translateService.setDefaultLang('hr');
            this.translateService.use('en')
            this.platform.setDir('ltr', true);
          }
          else{
            this.translateService.setDefaultLang('en');
            this.translateService.use('hr');
            this.platform.setDir('rtl', true);
          }


        }
        else {
          //this.translateService.setDefaultLang('hr');
          this.translateService.use('hr');
            this.platform.setDir('rtl', true);
          
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          this.rootPage = 'AdminPanelPage';
          this.translateService.setDefaultLang('hr');
            this.translateService.use('en')
            this.platform.setDir('ltr', true);
        }
        else {
          this.rootPage = 'TabsPage';
        }
      }, 1000);
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
