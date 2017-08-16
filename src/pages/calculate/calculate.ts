import { last } from 'rxjs/operator/last';
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
  private summary: any = {
    total: 0
  };
  private cashReceive: string = "0";
  private cashReceiveShow: string = "0";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatePage');
    this.orders = this.navParams.get('ord');
    this.calculate(this.orders);
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
          this.summary.total = 0;
          this.calculate(this.orders);
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
        this.summary.total = 0;
        this.calculate(this.orders);
        break;
      }
    }
  }

  deleteOrder(orderID) {
    console.log(orderID);
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i]._id == orderID) {
        this.orders.splice(i, 1);
        this.summary.total = 0;
        this.calculate(this.orders);
        break;
      }
    }
  }
  calculate(order) {
    for (let i = 0; i < this.orders.length; i++) {
      console.log("Amount : " + parseInt(this.orders[i].amount));
      let totalsum = parseInt(this.orders[i].amount) * parseInt(this.orders[i].price);
      this.summary.total += totalsum;
      console.log("this.summary.total : " + this.summary.total);
      console.log("totalsum : " + totalsum);
    }

  }
  clickNum(num) {
    if (this.cashReceive == "0" && num != "0" && num != "00" && this.cashReceive.length == 1) {
      this.cashReceive = num;
    } else if (this.cashReceive.length >= 1) {
      this.cashReceive += num;
    }
    this.cashReceiveShow = this.addcomma(this.cashReceive);
    // console.log(this.cashReceiveShow);
    // this.cashReceive = this.addcomma(this.cashReceive);
    // this.cashReceive = str;
    // } else if (){ }
    // this.cashReceiveShow = this.cashReceive;
  }
  addcomma(cashReceive) {
    return cashReceive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  clickDel() {
    if (this.cashReceive != null && this.cashReceive.length > 0 && this.cashReceive.charAt(this.cashReceive.length - 1) == 'x') {
      this.cashReceive = this.cashReceive.substring(0, this.cashReceive.length - 1);
      this.cashReceiveShow = this.cashReceive
    }

  }
  clickClear() {
    this.cashReceive = "0"; this.cashReceiveShow = "0";
  }
}