import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import *as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-quality',
  templateUrl: 'quality.html',
})
export class QualityPage {


  private isadmin: boolean;
  private quality = '';
  private url = '';
  private loader: boolean = true;
  private selectedPhoto: any;
  private filetoupload: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCntrl:ViewController) {
   // this.default_language = this.translateService.getDefaultLang();

    if (this.navParams.get("type") == 'Admin') {
      this.isadmin = false;
    }
    else {
      this.isadmin = true;
    }
    let qualityRef = firebase.database().ref("/Quality");
    qualityRef.on('value', (snapshot) => {
      if (snapshot.val() != null) {
        let data = snapshot.val();

        //this.quality = data['Details'];
        this.selectedPhoto = data['ImagePath'];
      }
      this.loader = false;
    });
  }
  ionViewDidLoad() {    
  }
  autogrow() {
    let textArea = document.getElementById("textarea")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  save() {
    this.loader = true;
    if(this.filetoupload)
    {
      var timeNow = new Date().getTime();
      let temp = this.filetoupload.name.split(".");
      let filename = temp[0] + "_" + timeNow + "." + temp[1];
      let storage = firebase.storage().ref('Quality/' + filename);
      storage.put(this.filetoupload).then((snapshot) => {
        this.url = snapshot.downloadURL;
        let qualityRef = firebase.database().ref("/Quality");
        var updateData = {
          'Details': this.quality,
          'ImagePath': this.url
        }
        qualityRef.update(updateData).then(() => {
          this.loader = false;
          this.viewCntrl.dismiss();
        });
      }, (error) => {        
      });
    }
    else{
      let qualityRef = firebase.database().ref("/Quality");
      var updateData = {
        'Details': this.quality,
      }
      qualityRef.update(updateData).then(() => {        
        this.loader = false;
        this.viewCntrl.dismiss();
      });
    }
   


  }
  filechoose(event: any) {
    this.filetoupload = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedPhoto = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
