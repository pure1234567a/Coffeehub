import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PagetestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pagetest',
  templateUrl: 'pagetest.html',
})
export class PagetestPage {
  testdata = [{ name: "mick" }, { name: "Dook" }];
  testdata2: Object = { a: "A", b: "B", c: "C", d: "E" };
  binding: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagetestPage');
  }
  show(data) {
    this.binding = data;
    alert(JSON.stringify(data));
  }

}
