import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsPage } from "../news/news";
import { PromotionPage } from "../promotion/promotion";

/**
 * Generated class for the NewandpromotionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-newandpromotion',
  templateUrl: 'newandpromotion.html',
})
export class NewandpromotionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewandpromotionPage');
  }
  gotonews() {
    this.navCtrl.push(NewsPage);
  }
  gotopromotion() {
    this.navCtrl.push(PromotionPage);
  }
}
