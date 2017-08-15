import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReceiptPage } from "../receipt/receipt";

/**
 * Generated class for the CalculatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html',
})
export class CalculatePage {
  private orders: Array<any> = [];
  private summary: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
    this.orders = this.navParams.get('ord');
    console.log(this.orders);
  }
  swipeBackEnabled() {
  };

  gotoReceiptpage() {
    this.navCtrl.push(ReceiptPage);
  }

  cancelOrder() {
    this.orders = [];
    this.navCtrl.pop();
  }

  decreseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID2) {
        if (parseInt(this.orders[i].amount) > 1) {
          this.orders[i].amount = parseInt(this.orders[i].amount) - 1;
          break;
        }

      }
    }
  }
  increseqtyitem(orderID2) {
    console.log(orderID2);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID2) {
        this.orders[i].amount = parseInt(this.orders[i].amount) + 1;
        break;
      }
    }
  }
  calculate(order) {
    for (let i = 0; i < this.orders.length; i++) {
      this.summary.total += this.orders[i].amount * this.orders[i].price;

    }
    console.log(this.summary.total);
  }
}