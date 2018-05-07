import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };
@Injectable()
export class FirebaseServiceProvider {
  items: Observable<any[]>;
  CityList: Observable<any[]>;
  public states :boolean =false; 
  constructor(public afDB: AngularFireDatabase, public http: HttpClient) {
    this.items = this.afDB.list('Categories').valueChanges();
    this.CityList = this.afDB.list('CityList').valueChanges();

    
  }
  enableTabs()
  {
    this.states = true;
  }

  testForConsole() {

  }
  setFirebaseDataList(type, arr) {
    let res = this.afDB.list('Categories').push(arr);
    return res;
  }
  setItemToCategoryList(categoryId, arr) {
    let res = this.afDB.list('FoodList/' + categoryId).push(arr);
    return res;
  }
  setCityToList(arr) {
    let res = this.afDB.list('CityList').push(arr);
    return res;
  }
  setTaxToTaxList(arr) {
    let res = this.afDB.list('Taxes').push(arr);
    return res;
  }

  sendmail(orderid, userID) {
    return new Promise(resolve => {
      //     orderArr = JSON.stringify(orderArr);

      this.http.post("http://webservices.zamilfood.com/sendmail.php",{data:orderid}).subscribe(data => {
        resolve(data);
      }, err => {
      });
    });
  }

}
