import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the OrderlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderlistPage');
  }

}
